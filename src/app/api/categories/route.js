import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const MedCategory = await db.MedCategory.findMany();
        const categoryCount = MedCategory.length;
        
        // Log the total number of categories
        console.log('Total number of categories:', categoryCount);

        return new NextResponse(JSON.stringify(MedCategory), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
};
