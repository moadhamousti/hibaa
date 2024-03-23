import { db } from "@/lib/db"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const users = await db.user.findMany();
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
}




export const PUT = async (req, { params }) => {
    const { id } = params;
    const { role } = req.body;
      
  
    try {
      const updatedUser = await db.user.update({
        where: { id },
        data: { role }
      });
  
      return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
      console.error(error);
      return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
  }