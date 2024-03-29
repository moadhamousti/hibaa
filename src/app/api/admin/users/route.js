import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const users = await db.user.findMany({
            include: {
                DonPosts: true,
            },
        });

        // Calculate the total number of users
        const userCount = users.length;

        // Calculate the post count for each user
        const usersWithPostCount = users.map(user => {
            return {
                ...user,
                postCount: user.DonPosts.length,
                userCount: userCount, // Include the total user count for each user object
            };
        });

        return new NextResponse(JSON.stringify(usersWithPostCount), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
};





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