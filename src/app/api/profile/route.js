// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export const GET = async (req, { params }) => {
//   const { id } = params;
//   try {
//     // Fetch user
//     const user = await db.User.findUnique({
//       where: { id },
//     });

//     if (!user) {
//       return new NextResponse(
//         JSON.stringify({ message: "User not found" }),
//         { status: 404 }
//       );
//     }

//     // Fetch user's posts
//     const userWithPosts = await db.User.findUnique({
//       where: { id },
//       include: {
//         DonPosts: true // Assuming DonPosts is the relation to the posts
//       }
//     });

//     return new NextResponse(JSON.stringify(userWithPosts), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong" }),
//       { status: 500 }
//     );
//   }
// };





// export default async function handler(req, res) {
//   if (req.method !== 'PUT') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const { name, username, email } = req.body;

//   try {
//     // Update user profile information in the database
//     await db.User.update({
//       where: { email: session.user.email },
//       data: {
//         name,
//         username,
//         email,
//         // You can update other fields like password here if needed
//       },
//     });

//     return res.status(200).json({ message: 'User profile updated successfully' });
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// }



