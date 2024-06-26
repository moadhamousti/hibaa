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
        // return new NextResponse(JSON.stringify(DonPost,{status:200}))
        return new NextResponse(JSON.stringify(DonPost), { status: 200 });
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}








export const DELETE = async (req , {params}) =>{
    const {id} = params;
    try{
        const DonPost = await db.DonPost.delete({
            where:{id},

        })
        // return new NextResponse(JSON.stringify(DonPost,{status:200}))
        return new NextResponse(JSON.stringify(DonPost), { status: 200 });
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}




export const PUT = async (req , {params}) =>{
    const {id} = params;
    const{title, desc, phone, isWhatsapp, location,category,img} = await req.json()
    try{
        const DonPost = await db.DonPost.update({
            where:{id},
            data:{title, desc, phone, isWhatsapp,location,category,img}
        })
        // return new NextResponse(JSON.stringify(DonPost,{status:200}))
        return new NextResponse(JSON.stringify(DonPost), { status: 200 });
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}


