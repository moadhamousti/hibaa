import Pagination from '@/components/Admin/pagination/pagination'
import Search from '@/components/Admin/users/search'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "./posts.module.css"
import { fetchPosts } from '@/lib/data'
import { format } from 'date-fns';
import WhatsApp from "../../../../../public/whatsapp.svg"
import Phone from "../../../../../public/phone.png"
import { Badge } from '@/components/ui/badge';
import { deletePost } from '@/lib/actions'





const Posts = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  
  // Fetch posts
  const { posts, count  } = await fetchPosts(q, page);

  console.log(posts)

  return (
    <div className=" p-[20px] rounded-sm mt-[20px]">
      <div className="flex align-center justify-between">
        <Search placeholder="Recherche une poste..." />
        <Link href="/admin/dashboard/posts/Add">
          <button className="p-[10px] bg-[--darkishBlue] text-[white] -none cursor-pointer rounded-lg">Ajouter Nouveau</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead className='px-4 py-2 bg-white  text-center border'>
          <tr>
            <td className="font-bold  bg-white ">Type</td>
            <td className="font-bold  bg-white ">Image</td>
            <td className="font-bold  bg-white ">Titre</td>
            {/* <td className="font-bold">Description</td> */}
            <td className="font-bold  bg-white ">Créé à</td>
            <td className="font-bold  bg-white ">Emplacement</td>
            <td className="font-bold  bg-white ">Catégories</td>
            <td className="font-bold  bg-white ">Téléphone</td>
            <td className="font-bold  bg-white ">Type Numéro</td>
            <td className="font-bold  bg-white ">Action</td>
            
          </tr>
        </thead>
        <tbody className='text-center'>
          {posts.map(posts => (
            <tr key={posts.id} className='divide-y divide-slate-200' >
             <td className=" bg-white border-y">
              {posts.type === 'DONATION' && (
                  <Badge variant="light" className="bg-[--pink] text-white">
                    Donation
                  </Badge>
                )}
                {posts.type === 'REQUEST' && (
                  <Badge variant="light" className="bg-[--darkishBlue] text-white">
                    Demande
                  </Badge>
                )}
              </td>
              <td className=" bg-white ">
                <div className={styles.user}>
                  <Image
                    src={posts.img || "https://www.medisave.co.uk/cdn/shop/collections/Tom.jpg?v=1683730716"}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-sm"
                  />
                </div>
              </td>
              <td className=" bg-white ">{posts.title.length > 4 ? posts.title.substring(0, 4) + '...' : posts.title}</td>
              {/* <td>{posts.desc.length > 4 ? posts.desc.substring(0, 10) + '...' : posts.desc}</td> */}
              <td className=" bg-white ">{format(posts.createdAt, 'yyyy-MM-dd HH:mm:ss')}</td>
              <td className=" bg-white ">{posts.location}</td>
              <td className=" bg-white ">{posts.category}</td>
              <td className=" bg-white ">{posts.phone}</td>
              {/* <td>{posts.isWhatsapp}</td> */}
              <td className=" bg-white ">
                {posts.isWhatsapp ? (
                  <div className="flex gap-2">
                    
                    <Image
                      src={WhatsApp} // Replace with the path to your WhatsApp icon image
                      alt="WhatsApp"
                      width={20}
                      height={20}
                      className="rounded-sm"
                    />
                    <p
                        className=" text-black text-[14px]">WhatsApp
                    </p>
                  </div>
                  
                ) : (
                  <div className="flex gap-2">
                    
                    <Image
                      src={Phone}// Replace with the path to your regular icon image
                      alt="Regular"
                      width={20}
                      height={20}
                      className="rounded-sm"
                    />
                    <p
                        className="text-black text-[14px]">Normal
                    </p>
                  </div>
                )}
              </td>

              <td className=' bg-white '>
                <div className={styles.buttons}>
                  <Link href={`/admin/dashboard/posts/${posts.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>Voir</button>
                  </Link>
                  <form action={deletePost}>
                    <input type='text' defaultValue={posts.id} name='id' hidden/>
                    <input type='text' defaultValue={posts.type} name='postType' hidden/> {/* Assuming it's DonPost */}
                    <button className={`${styles.button} ${styles.delete}`}>Supprimer</button>
                  </form>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  )
}

export default Posts
