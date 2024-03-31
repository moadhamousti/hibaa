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

  if (status === "loading") {
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={loader} height={50} width={45} alt="" />
      </div>
    );
  }


  return (
    <div className="flex flex-wrap justify-center">
      <div className='column'>
        <div className=' pt-8 text-center'>
          <h1 className="text-4xl font-extrabold tracking-normal">Profile de <span className='text-[#3b83c6]'>{userData?.username || userData?.name}</span></h1>
        </div>
          <div className='mt-7'>
            {userData && (
              <>
                <div className="flex items-center justify-center">
                  <img
                    className="w-20 h-20 rounded-full mb-4"
                    src={userData.image || "https://github.com/shadcn.png"}
                    alt="Profile"
                  />
                </div>
                <div className="text-center gap-5">
                  <h2 className="text-lg font-semibold">{userData.name}</h2>
                  <h2 className="text-lg font-semibold">{userData.username}</h2>
                  <p className="text-sm text-grat-500">{userData.email}</p>
                  <p className="text-sm text-black">
                    <Badge variant="light" className={userData.role === 'ADMIN' ? 'bg-[#c1bc31]' : 'bg-[#3b83c6]'}>
                      {userData.role}
                    </Badge>
                  </p>
                </div>
              </>
            )}
            <div className="">
                  <h2 className="text-lg font-semibold mt-8">Postes d'utilisateur</h2>

            </div>

                <div>
                  <UserPosts id={userData?.id} />
                </div>
          </div>
      </div>
    </div>
  );
};

export default ProfileUserForm;
