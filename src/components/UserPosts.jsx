'use client'

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import loader from '../../public/loader.gif'

const UserPosts = ({ id }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { data: session, status } = useSession();


  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`https://www.hibaaatae.com/api/user/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch user posts');
        }
        const data = await res.json();
        const donPosts = data.DonPosts || [];
        const reqPosts = data.ReqPost || [];
        const combinedPosts = [...donPosts, ...reqPosts];
        setUserPosts(combinedPosts);
      } catch (error) {
        console.error(error);
        // Handle error appropriately (e.g., display an error message)
      }
    };
  
    fetchUserPosts();
  }, [id]);
  
  if (status === "loading") {
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={loader} height={50} width={45} alt="" />
      </div>
    );
  }

  return (
    <section className='py-12'>
      <div className=''>
        {userPosts.length > 0 && (
          <>
            {userPosts.length >= 4 && ( // Render Swiper only if 4 or more cards
              <Swiper
                navigation
                pagination={{ clickable: true }} // Make pagination dots clickable
                modules={[Navigation, Pagination]}
                slidesPerView={3}
                className='h-full w-full rounded-lg'
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  600: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                }}
              >
                {/* Wrap posts in SwiperSlide components */}
                {userPosts.map((post) => (
                  <SwiperSlide key={post.id} className="h-full px-4 mb-4">
                    <Card item={post} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {userPosts.length < 4 && ( // Render cards individually if less than 4
              <div className="w-full flex flex-wrap">
                {userPosts.map((post, index) => (
                  <div key={post.id} className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-4 mb-4 ${index % 3 === 0 ? '' : 'sm:pl-2 md:pl-2 lg:pl-2'}`}>
                    {/* Adjust the width classes (sm:w-1/2, md:w-1/3, lg:w-1/3) based on your design requirements */}
                    <Card item={post} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {userPosts.length === 0 && ( // Handle the case of no posts
          <p className="text-center">No posts found.</p>
        )}
      </div>
    </section>
  );
};

export default UserPosts;
