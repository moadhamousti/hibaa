// Import necessary dependencies and database connection
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Endpoint for GET request to fetch all posts
export const GET = async () => {
    try {
        const posts = await db.donPost.findMany();
        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
}



// Endpoint for PUT request to update a post
export const PUT = async (req, { params }) => {
    const { id } = params;
    const { title, desc, img, phone, isWhatsapp, views, userEmail, location, category, type } = req.body;
  
    try {
        const updatedPost = await db.donPost.update({
            where: { id },
            data: { title, desc, img, phone, isWhatsapp, views, userEmail, location, category, type }
        });
  
        return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
}
