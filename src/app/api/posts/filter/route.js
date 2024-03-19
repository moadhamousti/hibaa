import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");
  const category = searchParams.get("category");

  console.log("Location:", location);
  console.log("Category:", category);

  try {
    const filteredPosts = await db.DonPost.findMany({
      where: {
        location: location,
        category: category
      }
    });

    console.log("Filtered Posts:", filteredPosts);

    return new NextResponse(JSON.stringify(filteredPosts), { status: 200 });
  } catch (err) {
    console.error('Error fetching filtered posts:', err);
    return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
  }
};
