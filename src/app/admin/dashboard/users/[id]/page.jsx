import { fetchUser } from '@/lib/data';
import styles from './singleUserPage.module.css'; 
import Image from 'next/image'; 
import { updateUser } from '@/lib/actions';
import Link from 'next/link';

const SingleUserPage = async ({ params }) => {
  const { id } = params;

  // Fetch user data directly in the component
  const user = await fetchUser(id);
  console.log(user);



  return (
    <div className={styles.container}>
                    <div className={styles.infoContainer}>
                      
                      <div className={styles.imgContainer}>
                        <Image src={user.image || "https://github.com/shadcn.png"} alt="" fill/>  
                      </div>
                      <span>{user.name}</span>
                    </div>
                    <div className={styles.formContainer}>
                        <form action={updateUser} className={styles.form}>
                            <input name='id' value={user.id} hidden/>
                            <label>Nom</label>
                            <input type="text" name='name' placeholder={user.name}/>
                            <label>Nom d'Utilisateur</label>
                            <input type="text" name='username' placeholder={user.username} />
                            <label>E-mail</label>
                            <input type="email" name='email' placeholder={user.email} value={user.email}  readOnly/>
                            <label>Rôle</label>
                            <select name='role' id='role' defaultValue={user.role}>
                              <option value="ADMIN" selected={user.role ==="ADMIN"} >Administrateur</option>
                              <option value="USER" selected={!user.role ==="USER"}>Utilisateur</option>
                            </select>

                            <button type='submit'>
                                Modifier
                            </button>
 
                        </form>
                    </div>
    </div>
  )
}

export default SingleUserPage