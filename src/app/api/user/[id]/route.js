import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    // Fetch user
    const user = await db.User.findUnique({
      where: { id },
      include: {
        DonPosts: true,
        ReqPost: true
      }
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    // Fetch user's posts
    const userWithPosts = await db.User.findUnique({
      where: { id },
      include: {
        DonPosts: true,
        ReqPost: true
      }
    });

    return new NextResponse(JSON.stringify(userWithPosts), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

