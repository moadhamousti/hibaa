import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  try {
    const body = await req.json();
    const { name ,username, email, password, role,image } = body;

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
        name,
        image,
        role: role || "USER"
      },
    });

    const {password: NewUserPassword, ...rest } = newUser;

    return new NextResponse(
      JSON.stringify({
        user: { ...rest, role: newUser.role, image: newUser.image }, // Add role to user object
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







const jwt = require('jsonwebtoken');

export const PUT = async (req) => {
  try {
    const body = await req.json();
    console.log("Request Body:", body); // Log the request body

    const { id, name, username, email, password, role, image } = body;

    // Check if the user exists
    const existingUser = await db.user.findUnique({
      where: { id: id },
    });
    console.log("Existing User:", existingUser); // Log the existing user
    if (!existingUser) {
      console.log("User not found"); // Log if user not found
      return new NextResponse(
        JSON.stringify({
          user: null,
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    // Hash the password if provided
    let hashedPassword = existingUser.password;
    if (password) {
      hashedPassword = await bcryptjs.hash(password, 10);
    }

    // Update the user
    const updatedUser = await db.user.update({
      where: { id: id },
      data: {
        name: name || existingUser.name,
        username: username || existingUser.username,
        email: email || existingUser.email,
        password: hashedPassword,
        image: image !== undefined ? image : existingUser.image,
        role: role || existingUser.role,
      },
    });
    console.log("Updated User:", updatedUser); // Log the updated user

    // Manually trigger the JWT callback with the updated user data
    const token = jwt.sign(
      {
        id: updatedUser.id,
        username: updatedUser.username,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        role: updatedUser.role,
      },
      process.env.JWT_SECRET // You need to specify your JWT secret here
    );

    // Prepare the response
    const { password: newUserPassword, ...rest } = updatedUser;

    return new NextResponse(
      JSON.stringify({
        user: { ...rest, role: updatedUser.role, image: updatedUser.image },
        message: "User updated successfully",
        token: token, // Include the token in the response
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error); // Log any errors
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
