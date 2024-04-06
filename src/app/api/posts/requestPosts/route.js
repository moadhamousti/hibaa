import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req) =>{

    const {searchParams} = new URL(req.url)
    const page = searchParams.get("page")
    const cat = searchParams.get("cat")
    const loc = searchParams.get("loc")
    const type = searchParams.get("type");



    const POST_PER_PAGE = 4;
    
    try{
        const ReqPost = await db.ReqPost.findMany({
            include:{user: true},
            take:POST_PER_PAGE,
            skip: POST_PER_PAGE * (page - 1),
            where: {
                ...(cat && { category : cat}),
                ...(loc && { location : loc}),
                ...(type && { type : type}),


            }
        })
        return new NextResponse(JSON.stringify(ReqPost,{status:200}))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}