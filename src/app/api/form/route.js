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

    const userEmail = session.user.email;

    const DonatorForm = await db.DonatorForm.create({
      data: { ...body, userEmail },
    });

    return new NextResponse(JSON.stringify(DonatorForm, { status: 200 }));
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};




export const GET = async (req) => {
  try {
    const posts = await db.DonatorForm.findMany({
      where: {
        isValidated: 'VALIDER'
      },
      include: {
        user: true
      },
    });

    return new NextResponse(JSON.stringify(posts, null, 2), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 }
    );
  }
};





export const PUT = async (req , {params}) =>{
  const {id} = params;
  const{phaName,ownerName,desc,phone,isWhatsapp,address,facebook,twitter,instagram,img,location 
  } = await req.json()
  try{
      const DonatorForm = await db.DonatorForm.update({
          where:{id},
          data:{phaName,ownerName,desc,phone,isWhatsapp,address,facebook,twitter,instagram,img,location }
      })
      return new NextResponse(JSON.stringify(DonatorForm,{status:200}))
  }catch(err){
      console.log(err)
      return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
  };
}










