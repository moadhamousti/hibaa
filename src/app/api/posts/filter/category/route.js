import { db } from "@/lib/db"; // Assuming this imports your Prisma client
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const category = req.params.category;

    if (!category) {
      return new NextResponse(JSON.stringify({ message: "Category parameter is missing" }), { status: 400 });
    }

    const reqPosts = await db.reqPost.findMany({
      include: { user: true }, // Include related user data if needed
      where: {
        category: category
      },
    });

    return new NextResponse(JSON.stringify(reqPosts), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
};