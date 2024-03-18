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
