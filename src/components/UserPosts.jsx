"use client"

import React, { useEffect, useState } from 'react';
import Card from './Card';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch('/api/posts/donatePosts/UserDonatePosts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data); // Assuming the API returns an array of posts
        } else {
          console.error('Failed to fetch user posts:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;