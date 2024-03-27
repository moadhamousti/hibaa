// api/reset-password

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

export const POST = async (req) => {
    const { password, email } = await req.json();

    try {
        // Find the user by email
        const existingUser = await db.user.findUnique({ where: { email } });

        // Check if the user exists
        if (!existingUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Hash the new password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Update user's password
        await db.user.update({
            where: { email },
            data: {
                password: hashedPassword,
            }
        });

        return new NextResponse("User's password has been successfully updated.", { status: 200 });
    } catch (error) {
        console.error("Error occurred while updating user's password:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
