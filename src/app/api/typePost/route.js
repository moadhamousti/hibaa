import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const donPostTypes = await db.DonPost.findMany({ distinct: ['type'] });
        const reqPostTypes = await db.ReqPost.findMany({ distinct: ['type'] });

        // Extract unique types from DonPost and ReqPost arrays
        const allTypes = [...new Set([...donPostTypes.map(post => post.type), ...reqPostTypes.map(post => post.type)])];

        // Return the combined unique types array
        return new NextResponse(JSON.stringify(allTypes, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }, { status: 500 }));
    }
}

