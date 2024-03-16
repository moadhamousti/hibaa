import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async () =>{
    try{
        const DonPost = await db.DonPost.findMany()
        return new NextResponse(JSON.stringify(DonPost,{status:200}))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}