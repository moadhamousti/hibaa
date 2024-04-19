"use client"


import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import UserPosts from '../UserPosts';
import { useSession } from 'next-auth/react';
import loader from '../../../public/loader.gif'
import Image from 'next/image';

const ProfileUserForm = () => {
  const [userData, setUserData] = useState(null);
  const { data: session, status } = useSession();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);

        const res = await fetch(`https://hibaatae.vercel.app/api/user/${id}`, {
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

  console.log(userData)

  if (status === "loading") {
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={loader} height={50} width={45} alt="" />
      </div>
    );
  }


  return (
    <>
    <div className="">
      <div className=' pt-8 text-left items-start'>
        <h1 className="text-3xl font-extrabold tracking-normal">Profile de <span className='text-[--darkishBlue]'>{userData?.username || userData?.name}</span></h1>
      </div>
    </div>
    <div className="flex flex-wrap justify-center mb-5">
      <div className='column'>
          <div className='mt-7'>
            {userData && (
              <>
                <div className="flex items-center justify-center">
                  <Image
                    className="w-20 h-20 rounded-full mb-4"
                    src={userData.image || "https://github.com/shadcn.png"}
                    alt="Profile"
                    height={100}
                    width={100}
                  />
                </div>
                <div className="text-center gap-10">
                  <h2 className="text-lg font-semibold mb-2">{userData?.name || userData?.username}</h2>
                  <p className="text-sm text-grat-500 mb-2">{userData.email}</p>
                  {userData.role === 'ADMIN' && (
                    <p className=" text-[--darkishBlue]">Admin</p>
                  )}
                </div>
              </>
            )}
            
          </div>
      </div>
    </div>
    <div className="text-left">
      <h3 className='text-left text-[20px] font-semibold'><span className='text-[--darkishBlue]'>{userData?.name || userData?.username} </span>Postes</h3>
    </div>

    <div>
      <UserPosts id={userData?.id} image={userData?.image} />
    </div>
    </>
  );
};

export default ProfileUserForm;
