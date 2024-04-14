import { db } from "@/lib/db"; // Assuming this imports your Prisma client
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
      const { searchParams } = new URL(req.url);
      const loc = searchParams.get("loc");
  
      console.log("Location:", loc); // Log the location parameter
  
      const DonatorForms = await db.DonatorForm.findMany({
        include: { user: true },
        where: {
          ...(loc && { location: loc }),
        },
      });
  
      console.log("DonatorForms:", DonatorForms); // Log the retrieved forms
  
      return new NextResponse(JSON.stringify(DonatorForms), { status: 200 });
    } catch (err) {
      console.error(err);
      return new NextResponse(JSON.stringify({ message: err.message || "Something went wrong" }), { status: 500 });
    }
  };
  
