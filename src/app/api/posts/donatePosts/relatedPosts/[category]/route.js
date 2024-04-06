import { db } from "@/lib/db"; // Assuming this imports your Prisma client
import { NextResponse } from "next/server";


export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat");

    const DonPost = await db.DonPost.findMany({
      include: { user: true }, // Include related user data if needed
      where: {
        ...(cat && { category: cat }), // Filter by category if provided
      },
    });

    return new NextResponse(JSON.stringify(DonPost), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
};
