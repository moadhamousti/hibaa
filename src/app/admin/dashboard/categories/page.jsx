import Search from "@/components/Admin/users/search"

import Link from "next/link"
import styles from "./categories.module.css"
import Pagination from "@/components/Admin/pagination/pagination"
import { fetchcategories } from "@/lib/data"
import { deleteCategory } from "@/lib/actions"



const Categories = async ({ searchParams }) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { categories, count } = await fetchcategories(q, page);
  console.log(categories);
  console.log(categories.DonPosts);

  

  return (
    <div className="p-[20px] rounded-sm mt-[20px]">
      <div className="flex align-center justify-between">
        <Search placeholder="Recherche une catégorie..." />
        <Link href="/admin/dashboard/categories/Add"> {/* Corrected href */}
          <button className="p-[10px] bg-[--darkishBlue] text-[white] border-none rounded-lg cursor-pointer">Ajouter Nouveau</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead className="px-4 py-2 text-center">
          <tr>
            <td className="font-bold  bg-white ">Title</td>
            <td className="font-bold  bg-white ">Don Postes</td>
            <td className="font-bold  bg-white ">Demande Postes</td> 
            <td className="font-bold bg-white ">Action</td> 


          </tr>
        </thead>
        <tbody className="text-center">
          {categories.map((category) => (
            <tr key={category.id} className="border">
              <td className=" bg-white ">{category.title}</td>
              <td className=" bg-white ">{category.DonPosts ? category.DonPosts.length : 0}</td>
              <td className=" bg-white ">{category.ReqPost ? category.ReqPost.length : 0}</td>
              


              <td className=" bg-white  items-center">
                <div className={styles.buttons}>
                  <Link href={`/admin/dashboard/categories/${category.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>Voir</button>
                  </Link>
                  <form action={deleteCategory} className={styles.deleteForm}>
                    <input type='hidden' defaultValue={category.id} name='id' />
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