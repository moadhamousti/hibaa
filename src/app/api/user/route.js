import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // Check if a user with the given email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return new NextResponse(
        JSON.stringify({
          user: null,
          message: "User with this email already exists",
        }),
        { status: 409 }
      );
    }

    // Check if a user with the given username already exists
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return new NextResponse(
        JSON.stringify({
          user: null,
          message: "User with this username already exists",
        }),
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create the new user
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const {password: NewUserPassword, ...rest } = newUser;

    return new NextResponse(
      JSON.stringify({
        user: rest,
        message: "User created successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
