"use client"
import React, { useEffect, useState } from 'react'
import styles from './singleUserPage.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react';

const SingleUserPage = () => {

    const [userData, setUserData] = useState(null);
  const { data: session, status } = useSession();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 3);

        const res = await fetch(`http://localhost:3000/api/user/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
        {userData && (
                <>
                    <div className={styles.infoContainer}>
                        <div className={styles.imgContainer}>
                            <Image src={userData.image} alt="" fill/>  
                        </div>
                        Jogn Doe
                    </div>
                    <div className={styles.formContainer}>
                        <form action="" className={styles.form}>
                            <label>Name</label>
                            <input type="text" name='name' placeholder='john doe'/>
                            <label>Username</label>
                            <input type="text" name='username' placeholder='john_doe123'/>
                            <label>Email</label>
                            <input type="email" name='email' placeholder='exemple@exemple.com'/>
                            <label>Password</label>
                            <input type="password" name='password' placeholder='password'/>
                            <label>Is Admin</label>
                            <select name='isAdmin' id='isAdmin'>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                            <button type='submit'>
                                Update
                            </button>
                        </form>
                    </div>
                </>
            )}
    </div>
  )
}

export default SingleUserPage