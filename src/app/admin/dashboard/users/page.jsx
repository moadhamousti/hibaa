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
    <div className=" p-[20px] rounded-sm mt-[20px]">
      <div className="flex align-center justify-between">
        <Search placeholder="Recherche un utilisateur..."/>
        <Link href="/admin/dashboard/users/Add">
          <button className="p-[10px] bg-[--darkishBlue] text-[white] -none rounded-lg cursor-pointer">Ajouter Nouveau</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead className="px-4 py-2 bg-white text-center border">
          <tr>
            <td className="font-bold  ">Image</td>
            <td className="font-bold  ">Nom</td>
            <td className="font-bold  ">Nom d&apos;utilisateur</td>
            <td className="font-bold  ">E-mail</td>
            <td className="font-bold  ">Créé à</td>
            <td className="font-bold  ">Rôle</td>
            <td className="font-bold   ">Action</td>
          </tr>
        </thead>
        <tbody className="text-center ">
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
            <td className=" bg-white ">
              <Badge
                variant="light"
                className={user.role === 'ADMIN' ? 'bg-[--darkishBlue] text-white' : 'bg-[--pink] text-white'}
              >
              {user.role === 'ADMIN' ? 'Admin' : 'Utilisateur'}
              </Badge>
            </td>


            <td className=" bg-white">
              <div className={styles.buttons}>
                <Link href={`/admin/dashboard/users/${user.id}`}>
                  <button className={`${styles.button} ${styles.view}`}>Voir</button>
                </Link>
                <form onSubmit={async (e) => {
                    e.preventDefault(); // Prevent default form submission
                    const formData = new FormData(e.target);
                    const id = formData.get("id");
                    try {
                      await deleteUser({ id }); // Call the deleteUser function
                      console.log("User deleted successfully");
                      // Optionally, you can add code to update the UI after deletion
                    } catch (error) {
                      console.error("Error deleting user:", error);
                      // Handle error
                    }
                  }}>
                    <input type="text" defaultValue={user.id} name="id" hidden />
                    <button type="submit" className={`${styles.button} ${styles.delete}`}>Supprimer</button>
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
