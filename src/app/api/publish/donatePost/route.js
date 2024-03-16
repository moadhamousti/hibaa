import { db } from "@/lib/db";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const POST = async (req) =>{
    const session = await getServerSession();

    if(!session){
        return new NextResponse(
            JSON.stringify({message: 'Not Authenticated'},{status: 401})
        );
    }

    try{
        const body = await req.json();
        const DonPost = await db.DonPost.create({
            data: {...body,userEmail: session.user.email},
        });

        return new NextResponse(JSON.stringify(DonPost,{status:200}));
    }catch(err){
        console.log(err);
        return new NextResponse(
            JSON.stringify({message:"Something went wrong!"}, {status:500})
        )

    }
}