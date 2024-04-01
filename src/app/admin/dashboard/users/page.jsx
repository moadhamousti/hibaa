import Search from "@/components/Admin/users/search"
import UsersAction from "@/components/Admin/users/usersAction"
import Image from "next/image"
import Link from "next/link"
import styles from "./users.module.css"
import Pagination from "@/components/Admin/pagination/pagination"
import { fetchUsers } from "@/lib/data"
import { format } from 'date-fns';


const Users = async ({searchParams}) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const {users,count} = await fetchUsers(q,page)
  // console.log("users",users)
  return (
    <div className="bg-gray-300 p-[20px] rounded-sm mt-[20px]">
      <div className="flex align-center justify-between">
        <Search placeholder="Recherche un utilisateur..."/>
        <Link href="/admin/dashboard/users/Add">
          <button className="p-[10px] bg-[#5d57c9] text-[white] border-none rounded-sm cursor-pointer">Ajouter Nouveau</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td className="font-bold">Name</td>
            <td className="font-bold">Username</td>
            <td className="font-bold">E-mail</td>
            <td className="font-bold">Created At</td>
            <td className="font-bold">Role</td>
            <td className="font-bold ">Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=>(
            <tr key={user.id}>
            <td>
              <div className={styles.user}>
                <Image
                  src={user.image || "https://github.com/shadcn.png"}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {user.name}
              </div>
            </td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{format(user.createdAt, 'yyyy-MM-dd HH:mm:ss')}</td>
            <td>{user.role}</td>
            <td>
              <div className={styles.buttons}>
                <Link href={`/admin/dashboard/users/${user.id}`}>
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
      <Pagination count={count}/>
      
    </div>
  )
}

export default Users
