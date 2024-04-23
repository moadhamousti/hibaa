import Pagination from '@/components/Admin/pagination/pagination'
import Search from '@/components/Admin/users/search'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "./forms.module.css"
import { fetchForms, fetchPosts } from '@/lib/data'
import { format } from 'date-fns';
import WhatsApp from "../../../../../public/whatsapp.svg"
import Phone from "../../../../../public/phone.png"
import { Badge } from '@/components/ui/badge';
import { deleteForm, deletePost } from '@/lib/actions'






const Form = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  
  // Fetch posts
  const { forms, count  } = await fetchForms(q, page);

  console.log(forms)

  return (
    <div className=" p-[20px] rounded-sm mt-[20px]">
      <div className="flex align-center justify-between">
        <Search placeholder="Recherche une formulaire..." />
        <Link href="/admin/dashboard/forms/Add">
          <button className="p-[10px] bg-[--darkishBlue] text-[white] -none rounded-lg cursor-pointer">Ajouter Nouveau</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead className='px-4 py-2 bg-white text-center border'>
          <tr>
            <td className="font-bold  bg-white ">Status</td>
            <td className="font-bold  bg-white ">Image</td>
            <td className="font-bold  bg-white ">Nom Pharmacie</td>
            <td className="font-bold  bg-white ">Propriétaire</td>
            <td className="font-bold  bg-white ">Adresse</td>
            <td className="font-bold  bg-white ">Téléphone</td>
            <td className="font-bold  bg-white ">Créé à</td>
            <td className="font-bold  bg-white ">Emplacement</td>
            <td className="font-bold  bg-white ">Type Numéro</td>
            <td className="font-bold  bg-white ">Action</td>
            
          </tr>
        </thead>
        <tbody className='text-center '>
          {forms.map(forms => (
            <tr key={forms.id} className='border'>
              <td className=" bg-white ">
                <Badge
                  variant="light"
                  className={forms.isValidated === 'VALIDER' ? 'bg-[--pink] text-white' : 'text-white bg-[--darkishBlue]'}
                >
                {forms.isValidated}
                </Badge>
              </td>
              <td className=" bg-white ">
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
              <td className=" bg-white ">{forms.phaName}</td>
              <td className=" bg-white ">{forms.ownerName}</td>
              <td className=" bg-white ">{forms.address}</td>
              <td className=" bg-white ">{forms.phone}</td>
              <td className=" bg-white ">{format(forms.createdAt, 'yyyy-MM-dd HH:mm:ss')}</td>
              <td className=" bg-white ">{forms.location}</td>
              {/* <td>{posts.isWhatsapp}</td> */}
              <td className=" bg-white ">
                <div className="flex gap-1">
                  <Image
                    src={forms.isWhatsapp === 'WHATSAPP' ? WhatsApp : Phone}
                    alt={forms.isWhatsapp === 'WHATSAPP' ? 'WhatsApp' : 'Regular'}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                  <p
                    className={forms.isWhatsapp === 'WHATSAPP' ? ' text-black text-[14px]' : ' text-black text-[14px]'}
                  >
                    {forms.isWhatsapp === 'WHATSAPP' ? 'WhatsApp' : 'Normal'}
                  </p>
                </div>
              </td>



              <td className=' bg-white'>
                <div className={styles.buttons}>
                  <Link href={`/admin/dashboard/forms/${forms.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>Voir</button>
                  </Link>
                  <form action={deleteForm}>
                    <input type='text' defaultValue={forms.id} name='id' hidden/>
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

export default Form
