import Search from "@/components/Admin/users/search"
import UsersAction from "@/components/Admin/users/usersAction"
import Image from "next/image"
import Link from "next/link"
import styles from "./users.module.css"
import Pagination from "@/components/Admin/pagination/pagination"

const Users = () => {
  return (
    <div className="bg-gray-300 p-[20px] rounded-sm mt-[20px]">
      <div className="flex align-center justify-between">
        <Search placeholder="Recherche un utilisateur..."/>
        <Link href="/admin/dashboard/users/add">
          <button className="p-[10px] bg-[#5d57c9] text-[white] border-none rounded-sm cursor-pointer">Ajouter Nouveau</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Username</td>
            <td>E-mail</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="https://github.com/shadcn.png"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                John Doe
              </div>
            </td>
            <td>john12</td>
            <td>john@gmail.com</td>
            <td>31-03-2024</td>
            <td>Admin</td>
            <td>
              <div className={styles.buttons}>
                <Link href="">
                  <button className={`${styles.button} ${styles.view}`}>Voir</button>
                </Link>
                <Link href="">
                  <button className={`${styles.button} ${styles.delete}`}>Supprimer</button>
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination/>
      
    </div>
  )
}

export default Users
