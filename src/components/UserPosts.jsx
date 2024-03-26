"use client"
import React, { useEffect, useState } from 'react';
import Card from './Card';

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
        // Handle error
      }
    };

    fetchUserPosts();
  }, [id]);

  return (
    <div className="flex flex-wrap justify-center">
      {userPosts.slice(0, 3).map((post) => (
        <div key={post.id} className=" px-4 mb-4">
          <Card item={post} />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
