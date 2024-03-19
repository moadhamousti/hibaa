import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async () =>{
    
    try{
        const ReqPost = await db.ReqPost.findMany({
            include:{user: true},
        })
        return new NextResponse(JSON.stringify(ReqPost,{status:200}))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}