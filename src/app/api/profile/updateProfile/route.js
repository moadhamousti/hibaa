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



// Import necessary dependencies
// Import necessary dependencies
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// Define the update profile function
export const UPDATE = async (req) => {
    // Get the user's session
    const session = await getServerSession();

    // Check if user is authenticated
    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: 'Not Authenticated' }, { status: 401 })
        );
    }

    try {
        // Parse request body
        const { name, username, email, password } = await req.json();

        // Update user credentials in the database
        const updatedUser = await db.user.update({
            where: { id: session.user.id },
            data: {
                name,
                username,
                email,
                password, // Include password field if provided
            },
        });

        // Return success response
        return new NextResponse(JSON.stringify(updatedUser, { status: 200 }));
    } catch (error) {
        // Handle errors
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: 'Something went wrong!' }, { status: 500 })
        );
    }
};


