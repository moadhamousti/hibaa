import Pagination from '@/components/Admin/pagination/pagination'
import Search from '@/components/Admin/users/search'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "./forms.module.css"
import { fetchForms, fetchPosts } from '@/lib/data'
import { format } from 'date-fns';
import WhatsApp from "../../../../../public/whatsapp.png"
import Phone from "../../../../../public/phone.png"
import { Badge } from '@/components/ui/badge';
import { deletePost } from '@/lib/actions'






const Form = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  
  // Fetch posts
  const { forms, count  } = await fetchForms(q, page);

  console.log(forms)

  return (
    <div className="bg-gray-300 p-[20px] rounded-sm mt-[20px]">
      <div className="flex align-center justify-between">
        <Search placeholder="Recherche une poste..." />
        <Link href="/admin/dashboard/forms/Add">
          <button className="p-[10px] bg-[--darkishBlue] text-[white] border-none rounded-sm cursor-pointer">Ajouter Nouveau</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead className='px-4 py-2 bg-white text-center'>
          <tr>
            <td className="font-bold border border-gray-300">Status</td>
            <td className="font-bold border border-gray-300">Image</td>
            <td className="font-bold border border-gray-300">Nom Pharmacie</td>
            <td className="font-bold border border-gray-300">Propriétaire</td>
            <td className="font-bold border border-gray-300">Adresse</td>
            <td className="font-bold border border-gray-300">Téléphone</td>
            <td className="font-bold border border-gray-300">Créé à</td>
            <td className="font-bold border border-gray-300">Emplacement</td>
            <td className="font-bold border border-gray-300">isWhatsapp</td>
            <td className="font-bold border border-gray-300">Action</td>
            
          </tr>
        </thead>
        <tbody className='text-center '>
          {forms.map(forms => (
            <tr key={forms.id}>
              <td className="border border-white">
                <Badge
                  variant="light"
                  className={forms.isValidated === 'VALIDER' ? 'bg-[#c1bc31]' : 'bg-[--darkishBlue]'}
                >
                {forms.isValidated}
                </Badge>
              </td>
              <td className="border border-white">
                <div className={styles.user}>
                  <Image
                    src={forms.img}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-sm"
                  />
                </div>
              </td>
              <td className="border border-white">{forms.phaName}</td>
              <td className="border border-white">{forms.ownerName}</td>
              <td>{forms.address}</td>
              <td>{forms.phone}</td>
              <td className="border border-white">{format(forms.createdAt, 'yyyy-MM-dd HH:mm:ss')}</td>
              <td className="border border-white">{forms.location}</td>
              {/* <td>{posts.isWhatsapp}</td> */}
              <td className="border border-white">
                <div className="flex gap-2">
                  <Image
                    src={forms.isWhatsapp === 'WHATSAPP' ? WhatsApp : Phone}
                    alt={forms.isWhatsapp === 'WHATSAPP' ? 'WhatsApp' : 'Regular'}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                  <Badge
                    variant="light"
                    className={forms.isWhatsapp === 'WHATSAPP' ? 'bg-[#33a833] text-black' : 'bg-[#3269ad] text-white'}
                  >
                    {forms.isWhatsapp === 'WHATSAPP' ? 'WhatsApp' : 'Regular'}
                  </Badge>
                </div>
              </td>



              <td className='border border-white'>
                <div className={styles.buttons}>
                  <Link href={`/admin/dashboard/forms/${forms.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>Voir</button>
                  </Link>
                  {/* <form action={deletePost}>
                    <input type='text' defaultValue={posts.id} name='id' hidden/>
                    <input type='text' defaultValue={posts.type} name='postType' hidden/>
                    <button className={`${styles.button} ${styles.delete}`}>Supprimer</button>
                  </form> */}

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

export default Form
