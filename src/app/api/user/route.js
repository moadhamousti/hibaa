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
// import { db } from "../../lib/db";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { email, username, password } = body;

//     // Check for existing user by email
//     const existingUserByEmail = await db.user.findUnique({
//       where: { email: email },
//     });
//     if (existingUserByEmail) {
//       return NextResponse.json(
//         { user: null, message: "User with this email already exists" },
//         { status: 409 }
//       );
//     }

//     // Check for existing user by username (optional)
//     const existingUserByUsername = await db.user.findUnique({
//       where: { username: username },
//     });
//     if (existingUserByUsername) {
//       return NextResponse.json(
//         { user: null, message: "Username already taken" },
//         { status: 409 }
//       );
//     }

//     // Hash the password
//     const hashedPassword = await hash(password, 10);

//     // Create a new user with sanitized data
//     const newUser = await db.user.create({
//       data: {
//         username,
//         email,
//         password: hashedPassword,
//       },
//     });

//     // Return only necessary user information
//     const sanitizedUser = {
//       id: newUser.id,
//       email: newUser.email,
//       username: newUser.username,
//     };

//     return NextResponse.json(
//       { user: sanitizedUser, message: "User created successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     // Handle specific errors here (optional)
//     return NextResponse.error(new Error("An error occurred"), { status: 500 });
//   }
// }