'use client'

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { images } from '../../images/images';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';

const UserPosts = ({ id }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch user posts');
        }
        const data = await res.json();
        setUserPosts(data.DonPosts || []);
      } catch (error) {
        console.error(error);
        // Handle error appropriately (e.g., display an error message)
      }
    };

    fetchUserPosts();
  }, [id]);

  return (
    <section className='py-12'>
      <div className='container'>
        {userPosts.length > 0 && ( // Render Swiper only if there are posts
          <Swiper
            navigation
            pagination={{ clickable: true }} // Make pagination dots clickable
            modules={[Navigation, Pagination]}
            // Remove unnecessary `onSwiper` callback
            className='h-96 w-full rounded-lg'
          >
            {/* Wrap posts in SwiperSlide components */}
            {userPosts.map((post) => (
              <SwiperSlide key={post.id} className="h-full px-4 mb-4">
                <Card item={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {userPosts.length === 0 && ( // Handle the case of no posts
          <p className="text-center">No posts found.</p>
        )}
      </div>
    </section>
  );
};

export default UserPosts;
