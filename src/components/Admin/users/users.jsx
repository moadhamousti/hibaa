import Search from "@/components/Admin/users/search"
import UsersAction from "@/components/Admin/users/usersAction"
import Image from "next/image"
import Link from "next/link"
import styles from "./users.module.css"
import Pagination from "@/components/Admin/pagination/pagination"
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { deleteUser } from "@/lib/actions"
import { fetchUsersByPosts } from "@/lib/data"



const Users = async ({searchParams}) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const {users,count} = await fetchUsersByPosts(q,page)
  // console.log("users",users)
  return (
    <>
    <div className="bg-[#F4F4F4] p-[20px] rounded-sm mt-[20px]">
      <div className="flex align-center justify-between">
        <h1 className="mb-2 text-[20px] font-semibold">Utilisateurs les plus contributeurs</h1>
        {/* <Search placeholder="Recherche un utilisateur..."/> */}
        {/* <Link href="/admin/dashboard/users/Add">
          <button className="p-[10px] bg-[#5d57c9] text-[white] -none rounded-sm cursor-pointer">Ajouter Nouveau</button>
        </Link> */}
      </div>
      <table className={styles.table}>
        <thead className="px-4 py-2 bg-white  text-center border">
          <tr>
            <td className="font-bold  bg-white ">Image</td>
            <td className="font-bold  bg-white ">Nom</td>
            <td className="font-bold  bg-white ">Nom d'utilisateur</td>
            <td className="font-bold  bg-white ">E-mail</td>
            <td className="font-bold  bg-white ">Créé à</td>
            <td className="font-bold  bg-white ">Nombre postes</td>
            <td className="font-bold  bg-white ">Rôle</td>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user)=>(
            <tr key={user.id} className="border">
            <td className=" bg-white ">
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
            <td className=" bg-white ">{user.name}</td>
            <td className=" bg-white ">{user.username}</td>
            <td className=" bg-white ">{user.email}</td>
            <td className=" bg-white ">{format(user.createdAt, 'yyyy-MM-dd HH:mm:ss')}</td>
            <td className="font-bold  bg-white ">{user.DonPosts.length + user.ReqPost.length}</td>

            <td className=" bg-white ">
              <Badge
                variant="light"
                className={user.role === 'ADMIN' ? 'bg-[--darkishBlue] text-white' : 'bg-[--pink] text-white'}
              >
              {user.role}
              </Badge>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination count={count}/> */}
      
    </div>
    </>
  )
}

export default Users



