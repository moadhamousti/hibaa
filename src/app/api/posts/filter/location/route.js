import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const loc = searchParams.get("loc"); // Change to loc instead of category

        const DonPost = await db.DonPost.findMany({
            include: { user: true },
            where: {
                ...(loc && { location: loc }), // Change category to location   
            }
        });

        return new NextResponse(JSON.stringify(DonPost), { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
};
