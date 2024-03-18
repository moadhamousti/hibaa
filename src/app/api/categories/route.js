import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async () =>{
    try{
        const MedCategory = await db.MedCategory.findMany()
        return new NextResponse(JSON.stringify(MedCategory,{status:200}))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}