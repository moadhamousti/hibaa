import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from 'crypto';

export const POST = async (req) => {
    const { token } = await req.json();

    console.log(token)

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    try {
        const user = await db.user.findFirst({
            where: {
                resetToken: hashedToken,
                resetTokenExpiry: { gt: new Date() }
            }
        });

        if (!user) {
            return new NextResponse("Invalid Token or has expired", { status: 400 });
        }

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error("Error occurred while verifying token:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
