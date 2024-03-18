import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req , {params}) =>{
    const {id} = params;
    try{
        const DonPost = await db.DonPost.update({
            where:{id},
            data:{views:{increment:1}},
            include:{user: true},
        })
        return new NextResponse(JSON.stringify(DonPost,{status:200}))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}
