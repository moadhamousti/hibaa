import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req) =>{

    const {searchParams} = new URL(req.url)
    const page = searchParams.get("page")
    const cat = searchParams.get("cat")
    const loc = searchParams.get("loc")


    const POST_PER_PAGE = 9;
    
    try{
        const DonPost = await db.DonPost.findMany({
            include:{user: true},
            take:POST_PER_PAGE,
            skip: POST_PER_PAGE * (page - 1),
            where: {
                ...(cat && { category : cat}),
                ...(loc && { location : loc}),

            }
        })
        return new NextResponse(JSON.stringify(DonPost,{status:200}))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}




// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export const GET = async (req) => {
//   try {
//     const { location, category } = req.query || {};
//     let filter = {};
    
//     if (location) {
//       filter.location = { equals: location };
//     }
    
//     if (category) {
//       filter.category = { equals: category };
//     }
    
//     const DonPost = await db.DonPost.findMany({
//       where: filter,
//       include: {
//         MedCategory: true,
//         cat: true,
//       },
//     });
    
//     return new NextResponse(JSON.stringify(DonPost), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new NextResponse(JSON.stringify({ message: err.message || "Something went wrong" }), { status: 500 });
//   }
// };
