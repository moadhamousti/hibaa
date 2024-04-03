// export const POST = async (request) => {
//     try {
//       // Get the session from the request
//       const session = await getSession({ req: request });
  
//       // Check if the user is authenticated
//       if (!session) {
//         return { error: "Unauthorized", status: 401 };
//       }
  
//       // Parse the request body to extract user data
//       const body = await request.json();
//       const { name, username, email, password } = body;
  
//       // Update user credentials in the database
//       const updatedUser = await db.user.update({
//         where: { id: session.user.id },
//         data: {
//           name,
//           username,
//           email,
//           ...(password && { password }), // Update password only if provided
//         },
//       });
  
//       // Return success message and updated user data
//       return { message: "User profile updated successfully", user: updatedUser };
//     } catch (error) {
//       // Handle errors and return an error response
//       console.error("Error updating user profile:", error);
//       return { error: "Internal Server Error", status: 500 };
//     }
//   };



import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; // Import for password hashing

export const UPDATE = async (req) => {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: 'Not Authenticated' }, { status: 401 })
    );
  }

  try {
    const { name, username, email, password } = await req.json();

    const updateData = {};

    if (name) updateData.name = name;
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    // Hash password before updating (if provided)
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateData.password = hashedPassword;
    }

    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: updateData,
    });

    // Consider returning only relevant user information
    return new NextResponse(JSON.stringify(updatedUser, { status: 200 }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }, { status: 500 })
    );
  }
};




// export const PUT = async (req) => {
//     console.log('Request body:', req.body);
//     console.log('Query parameters:', req.query);

//     let id;
//     if (req.query && req.query.id) {
//         id = req.query.id;
//     } else if (req.body && req.body.id) {
//         id = req.body.id;
//     }

//     const { name, username, email, password, image } = await req.json();

//     try {
//         if (!id) {
//             return new NextResponse(JSON.stringify({ message: 'User ID is required' }, { status: 400 }));
//         }

//         const existingUser = await db.user.findUnique({
//             where: { id }
//         });

//         if (!existingUser) {
//             return new NextResponse(JSON.stringify({ message: 'User not found' }, { status: 404 }));
//         }

//         const updatedUser = await db.user.update({
//             where: { id },
//             data: { name, username, email, password, image }
//         });

//         return new NextResponse(JSON.stringify(updatedUser, { status: 200 }));
//     } catch (error) {
//         console.error(error);
//         return new NextResponse(JSON.stringify({ message: 'Something went wrong' }, { status: 500 }));
//     }
// };
