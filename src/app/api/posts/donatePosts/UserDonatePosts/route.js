import { db } from "@/lib/db";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const session = await getSession({ req });

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized" }, { status: 401 })
    );
  }

  try {
    const userEmail = session.user.email;

    const userDonPosts = await db.User.findUnique({
      where: { email: userEmail },
      include: { DonPosts: true },
    });

    if (!userDonPosts) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }, { status: 404 })
      );
    }

    return new NextResponse(JSON.stringify(userDonPosts.DonPosts), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
