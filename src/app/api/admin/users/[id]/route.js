export const PUT = async (req , {params}) =>{
    const {id} = params;
    const{title, desc, phone, isWhatsapp, location,category,img} = await req.json()
    try{
        const DonPost = await db.DonPost.update({
            where:{id},
            data:{title, desc, phone, isWhatsapp,location,category,img}
        })
        return new NextResponse(JSON.stringify(DonPost,{status:200}))
    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: 'Something went worng'},{status:500}))
    };
}