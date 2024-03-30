// CREATE A POST

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const images = body.images; // Ensure that images is an array of strings

    // Retrieve the user's email from the session
    const userEmail = session.user.email;

    // Create the donPost with the associated user email
    const ReqPost = await db.ReqPost.create({
      data: { ...body, images, userEmail },
    });

    return new NextResponse(JSON.stringify(ReqPost, { status: 200 }));
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};