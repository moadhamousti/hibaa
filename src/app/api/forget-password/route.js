import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export const POST = async (req) => {
  try {
    const { email } = await req.json();

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return new NextResponse("Email does not exist", { status: 400 });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = new Date();
    passwordResetExpires.setHours(passwordResetExpires.getHours() + 1);

    // Log reset token and expiry for debugging
    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;
    console.log("Reset Token:", passwordResetToken);
    console.log("Reset Token Expiry:", passwordResetExpires);

    await db.user.update({
      where: { email },
      data: {
        resetToken: passwordResetToken,
        resetTokenExpiry: new Date(passwordResetExpires),
      },
    });

    const resetUrl = `localhost:3000/reset-password/${resetToken}`;
    const body = "Reset Password by clicking on following URL: " + resetUrl;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    const msg = {
      to: email,
      from: "moadhamousti@gmail.com",
      subject: "Reset Password",
      text: body,
    };

    await sgMail.send(msg);

    // Return success response after generating reset token and expiry
    return new NextResponse(JSON.stringify({ message: "Reset token generated successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error occurred while processing forget password request:", error);
    return new NextResponse("Failed sending email, Try again", { status: 500 });
  }
};





        // Update user with reset token and expiry
        // await db.user.update({
        //     where: { email },
        //     data: {
        //         resetToken: passwordResetToken,
        //         resetTokenExpiry: new Date(passwordResetExpires),
        //     },
        // });

        

        // const msg = {
        //     to: email,
        //     from: 'moadhamousti@gmail.com',
        //     subject: 'Reset Password',
        //     text: body,
        // };

        // sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

        // await sgMail.send(msg);

        // return new NextResponse("Email Sent for resetting Password", { status: 200 });