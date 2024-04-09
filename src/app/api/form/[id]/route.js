import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req , {params}) =>{
    const {id} = params;
    try{
        const DonatorForm = await db.DonatorForm.update({
            where:{id},
            data:{views:{increment:1}},
            include:{user: true},
        })
        return new NextResponse(JSON.stringify(DonatorForm,{status:200}))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}


export const PUT = async (req, { params }) => {
    const { id } = params;
    try {
      // Parse the request body
      const requestBody = await req.json();
      const { phaName, ownerName, desc, phone, isWhatsapp, address, facebook, twitter, instagram, img, location } = requestBody;
  
      // Assuming you're using Prisma, replace 'DonatorForm' with your model name
      const updatedDonatorForm = await db.DonatorForm.update({
        where: { id },
        data: {
          phaName,
          ownerName,
          desc,
          phone,
          isWhatsapp,
          address,
          facebook,
          twitter,
          instagram,
          img,
          location
        }
      });
  
      return new NextResponse(JSON.stringify(updatedDonatorForm, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(JSON.stringify({ message: 'Something went wrong' }, { status: 500 }));
    }
  };