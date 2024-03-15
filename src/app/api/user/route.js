import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import * as z  from "zod";


// input validation

const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email }
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exists"
        },
        { status: 409 }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username }
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this username already exists"
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    const {password: newUserPassword, ...rest} =newUser

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    // console.error(error);
    return NextResponse.json( {message:"Something went wrong"}, { status: 500 });
  }
}







// import { hash } from "bcrypt";
// import { NextResponse } from "next/server";
// import { db } from "../../../lib/db";
// import { z } from "zod";

// // Input validation
// const profileSchema = z
//   .object({
//     name: z.string().min(1, 'Name is required').max(100),
//     username: z.string().min(1, 'Username is required').max(100),
//     email: z.string().min(1, 'Email is required').email('Invalid email'),
//     password: z.string().min(8, 'Password must have at least 8 characters'),
//   });

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, username, email, password } = profileSchema.parse(body);

//     // Find the user by ID
//     const userId = req.session.get('userId');
//     if (!userId) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // Check if the email or username already exists for another user
//     const existingUserByEmail = await db.user.findFirst({
//       where: { email: email, NOT: { id: userId } }
//     });
//     if (existingUserByEmail) {
//       return NextResponse.json(
//         { message: "User with this email already exists" },
//         { status: 409 }
//       );
//     }

//     const existingUserByUsername = await db.user.findFirst({
//       where: { username: username, NOT: { id: userId } }
//     });
//     if (existingUserByUsername) {
//       return NextResponse.json(
//         { message: "User with this username already exists" },
//         { status: 409 }
//       );
//     }

//     // Hash the new password if provided
//     let hashedPassword = password;
//     if (password) {
//       hashedPassword = await hash(password, 10);
//     }

//     // Update user data
//     const updatedUser = await db.user.update({
//       where: { id: userId },
//       data: {
//         name: name,
//         username: username,
//         email: email,
//         password: hashedPassword
//       }
//     });

//     // Omit password field from response
//     const { password: newUserPassword, ...rest } = updatedUser;

//     return NextResponse.json(
//       { user: rest, message: "User profile updated successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Update error:", error);
//     return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
//   }
// }
