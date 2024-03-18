// CREATE A POST

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const images = body.images; // Ensure that images is an array of strings

    // Retrieve the user's email from the session
    const userEmail = session.user.email;

    // Create the donPost with the associated user email
    const DonPost = await db.DonPost.create({
      data: { ...body, images, userEmail },
    });

    return new NextResponse(JSON.stringify(DonPost, { status: 200 }));
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};




// CREATE A POST

// import { db } from "@/lib/db";
// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";

// export const POST = async (req) => {
//   const session = await getServerSession();

//   console.log(session);

//   console.log('Session:', session); // Add this line to log the session object

//   if (!session) {
//     console.log('Not authenticated'); // Add this line to log if the user is authenticated
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
//     );
//   }

//   try {
//     const body = await req.json();
//     const images = body.images; // Ensure that images is an array of strings

//     // Extract user ID from session
//     const userId = session.user.id;

//     const DonPost = await db.DonPost.create({
//       data: { ...body, images, user: { connect: { id: userId } } },
//     });

//     return new NextResponse(JSON.stringify(DonPost, { status: 200 }));
//   } catch (err) {
//     console.error(err); // Log any errors that occur during execution
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };
