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



export const UPDATE = async (req) => {
    const session = await getServerSession();

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: 'Not Authenticated' }, { status: 401 })
        );
    }

    try {
        const body = await req.json();
        const { name, username, email, password } = body;

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

        return new NextResponse(JSON.stringify(updatedUser, { status: 200 }));
    } catch (err) {
        console.error(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};
