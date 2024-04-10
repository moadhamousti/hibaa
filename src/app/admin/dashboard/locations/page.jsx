import Search from "@/components/Admin/users/search"

import Link from "next/link"
import styles from "./locations.module.css"
import Pagination from "@/components/Admin/pagination/pagination"
import { fetchlocations } from "@/lib/data"
import { deleteCategory } from "@/lib/actions"



const Categories = async ({ searchParams }) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { locations, count } = await fetchlocations(q, page);
  console.log(locations);
  console.log(locations.DonPosts);

  

  return (
    <div className="bg-gray-300 p-[20px] rounded-sm mt-[20px]">
      <div className="flex align-center justify-between">
        <Search placeholder="Recherche une catégorie..." />
        <Link href="/admin/dashboard/locations/Add"> {/* Corrected href */}
          <button className="p-[10px] bg-[--darkishBlue] text-[white] border-none rounded-sm cursor-pointer">Ajouter Nouveau</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead className="px-4 py-2 bg-white text-center">
          <tr>
            <td className="font-bold border border-gray-300">Titre</td>
            <td className="font-bold border border-gray-300">Don Postes</td>
            <td className="font-bold border border-gray-300">Demande Postes</td> 
            <td className="font-bold border border-gray-300">Action</td> 


          </tr>
        </thead>
        <tbody className="text-center">
          {locations.map((location) => (
            <tr key={location.id}>
              <td className="border border-white">{location.title}</td>
              <td className="border border-white">{location.DonPosts ? location.DonPosts.length : 0}</td>
              <td className="border border-white">{location.ReqPost ? location.ReqPost.length : 0}</td>
              


              <td className="border border-white">
                <div className={styles.buttons}>
                  <Link href={`/admin/dashboard/locations/${location.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>Voir</button>
                  </Link>
                  <form action={deleteCategory} className={styles.deleteForm}>
                    <input type='hidden' defaultValue={location.id} name='id' />
                    <button type="submit" className={`${styles.button} ${styles.delete}`}>Supprimer</button>
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

export default Categories