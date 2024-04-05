import Search from "@/components/Admin/users/search"
import UsersAction from "@/components/Admin/users/usersAction"
import Image from "next/image"
import Link from "next/link"
import styles from "./users.module.css"
import Pagination from "@/components/Admin/pagination/pagination"
import { fetchUsers } from "@/lib/data"
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { deleteUser } from "@/lib/actions"



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
          <button className="p-[10px] bg-[--darkishBlue] text-[white] border-none rounded-sm cursor-pointer">Ajouter Nouveau</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead className="px-4 py-2 bg-white text-center">
          <tr>
            <td className="font-bold border border-gray-300">Image</td>
            <td className="font-bold border border-gray-300">Nom</td>
            <td className="font-bold border border-gray-300">Nom d'utilisateur</td>
            <td className="font-bold border border-gray-300">E-mail</td>
            <td className="font-bold border border-gray-300">Créé à</td>
            <td className="font-bold border border-gray-300">Rôle</td>
            <td className="font-bold border border-gray-300 ">Action</td>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user)=>(
            <tr key={user.id}>
            <td className="border border-white">
              <div className="rounded-full bg-cover" style={{ width: 40, height: 40 }}>
                <Image
                  src={user.image || "https://github.com/shadcn.png"}
                  alt=""
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px] items-center rounded-full mb-4"
                />
              </div>
            </td>
            <td className="border border-white">{user.name}</td>
            <td className="border border-white">{user.username}</td>
            <td className="border border-white">{user.email}</td>
            <td className="border border-white">{format(user.createdAt, 'yyyy-MM-dd HH:mm:ss')}</td>
            <td className="border border-white">
              <Badge
                variant="light"
                className={user.role === 'ADMIN' ? 'bg-[#c1bc31]' : 'bg-[--darkishBlue]'}
              >
              {user.role}
              </Badge>
            </td>


            <td className="border border-white">
              <div className={styles.buttons}>
                <Link href={`/admin/dashboard/users/${user.id}`}>
                  <button className={`${styles.button} ${styles.view}`}>Voir</button>
                </Link>
                <form action={deleteUser}>
                    <input type='text' defaultValue={user.id} name='id' hidden/>
                    <button className={`${styles.button} ${styles.delete}`}>Supprimer</button>
                  </form>
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
