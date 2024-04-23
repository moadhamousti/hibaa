import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    // Fetch user with posts
    const userWithPosts = await db.User.findUnique({
      where: { id },
      include: {
        DonPosts: {
          include: {
            user: true // Include the user object
          }
        },
        ReqPost: {
          include: {
            user: true // Include the user object
          }
        }
      }
    });

    if (!userWithPosts) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    // return new NextResponse(JSON.stringify(userWithPosts), { status: 200 });
    // Set CORS headers
    
    return new NextResponse(JSON.stringify(userWithPosts), { status: 200 });

  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
