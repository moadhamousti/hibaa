import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async ({ params }) => {
    const { category } = params;

    try {
        const ReqPost = await db.ReqPost.findMany({
            include: { user: true },
            where: {
                category: category
            }
        });
        return new NextResponse(JSON.stringify(ReqPost, { status: 200 }));
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }, { status: 500 }));
    }
}
