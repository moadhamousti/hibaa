import Pagination from '@/components/Admin/pagination/pagination'
import Search from '@/components/Admin/users/search'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "./posts.module.css"
import { fetchPosts } from '@/lib/data'
import { format } from 'date-fns';
import WhatsApp from "../../../../../public/whatsapp.png"
import Phone from "../../../../../public/phone.png"
import { Badge } from '@/components/ui/badge';





const Posts = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  
  // Fetch posts
  const { DonPost, count } = await fetchPosts(q, page);

  console.log(DonPost)

  return (
    <div className="bg-gray-300 p-[20px] rounded-sm mt-[20px]">
      <div className="flex align-center justify-be tween">
        <Search placeholder="Recherche une poste..." />
        <Link href="/admin/dashboard/posts/Add">
          <button className="p-[10px] bg-[#5d57c9] text-[white] border-none rounded-sm cursor-pointer">Ajouter Nouveau</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td className="font-bold">Image</td>
            <td className="font-bold">Titre</td>
            <td className="font-bold">Description</td>
            <td className="font-bold">Created At</td>
            <td className="font-bold">Location</td>
            <td className="font-bold">Category</td>
            <td className="font-bold">Phone</td>
            <td className="font-bold">isWhatsapp</td>
            <td className="font-bold">Action</td>
          </tr>
        </thead>
        <tbody>
          {DonPost.map(DonPost => (
            <tr key={DonPost.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={DonPost.img || "https://github.com/shadcn.png"}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-sm"
                  />
                </div>
              </td>
              <td>{DonPost.title.length > 4 ? DonPost.title.substring(0, 4) + '...' : DonPost.title}</td>
              <td>{DonPost.desc.length > 4 ? DonPost.desc.substring(0, 10) + '...' : DonPost.desc}</td>
              <td className=''>{format(DonPost.createdAt, 'yyyy-MM-dd HH:mm:ss')}</td>
              <td>{DonPost.location}</td>
              <td>{DonPost.category}</td>
              <td>{DonPost.phone}</td>
              {/* <td>{DonPost.isWhatsapp}</td> */}
              <td>
                {DonPost.isWhatsapp ? (
                  <div className="flex gap-2">
                    
                    <Image
                      src={WhatsApp} // Replace with the path to your WhatsApp icon image
                      alt="WhatsApp"
                      width={20}
                      height={20}
                      className="rounded-sm"
                    />
                    <Badge
                        variant="light" className="bg-[#33a833] text-black">WhatsApp
                    </Badge>
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
                    <Badge
                        variant="light" className="bg-[#3269ad] text-white">Regular
                    </Badge>
                  </div>
                )}
              </td>

              <td>
                <div className={styles.buttons}>
                  <Link href={`/admin/dashboard/posts/${DonPost.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>Voir</button>
                  </Link>
                  <Link href="">
                    <button className={`${styles.button} ${styles.delete}`}>Supprimer</button>
                  </Link>
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
