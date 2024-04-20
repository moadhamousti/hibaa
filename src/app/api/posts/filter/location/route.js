import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const loc = req.query.loc; // Access loc from req.query instead of req.url

        const DonPost = await db.DonPost.findMany({
            include: { user: true },
            where: {
                ...(loc && { location: loc }), // Use location instead of category
            }
        });

        return new NextResponse(JSON.stringify(DonPost), { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
};
