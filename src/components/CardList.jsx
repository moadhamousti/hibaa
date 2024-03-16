"use client"


// cardList.jsx
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Pagination from './Pagination';

const CardList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/posts/donatePosts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPosts(data); // Assuming the response is an array of posts
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default CardList;

