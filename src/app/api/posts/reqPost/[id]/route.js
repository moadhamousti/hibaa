import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req , {params}) =>{
    const {id} = params;
    try{
        const ReqPost = await db.ReqPost.update({
            where:{id},
            data:{views:{increment:1}},
            include:{user: true},
        })
        // return new NextResponse(JSON.stringify(ReqPost,{status:200}))
        return new NextResponse(JSON.stringify(ReqPost), { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': 'https://www.hibaaatae.com',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          }
        });
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}









export const DELETE = async (req , {params}) =>{
    const {id} = params;
    try{
        const ReqPost = await db.ReqPost.delete({
            where:{id},

        })
        return new NextResponse(JSON.stringify(ReqPost,{status:200}))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}




export const PUT = async (req , {params}) =>{
    const {id} = params;
    const{title, desc, phone, isWhatsapp, location,category,img} = await req.json()
    try{
        const ReqPost = await db.ReqPost.update({
            where:{id},
            data:{title, desc, phone, isWhatsapp,location,category,img}
        })
        return new NextResponse(JSON.stringify(ReqPost,{status:200}))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}



export const getRelatedPostsByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const relatedPosts = await db.ReqPost.findMany({
      where: {
        category: {
          equals: category
        }
      },
      include: { user: true }
    });

    res.status(200).json(relatedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
