// import { db } from "@/lib/db"; // Assuming this imports your Prisma client
// import { NextResponse } from "next/server";

// export const GET = async (req) => {
//   try {
//     const category = req.params.category;

//     if (!category) {
//       return new NextResponse(JSON.stringify({ message: "Category parameter is missing" }), { status: 400 });
//     }

//     const reqPosts = await db.reqPost.findMany({
//       include: { user: true }, // Include related user data if needed
//       where: {
//         category: category
//       },
//     });

//     return new NextResponse(JSON.stringify(reqPosts), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
//   }
// };





import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const cat = searchParams.get("cat"); // Change to loc instead of category

        const DonPost = await db.DonPost.findMany({
            include: { user: true },
            where: {
                ...(cat && { category: cat }), // Change category to location   
            }
        });

        return new NextResponse(JSON.stringify(DonPost), { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
};
