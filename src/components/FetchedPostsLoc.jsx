"use client"

import React, { useState, useEffect } from 'react';
import Card from './Card'; // Import your Card component here
import loader from '../../public/loader.gif'
import Image from 'next/image';


const fetchPostsByCategory = async (loc) => {
  try {
    const response = await fetch(`/api/posts/filter/location?loc=${loc || ''}`); // Change this URL to fetch donatePosts
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { error: 'Something went wrong' };
  }
};

const FetchedPostsLoc = ({ selectedLocation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await fetchPostsByCategory(selectedLocation);
      if (!data.error) {
        setPosts(data);
      }
      setLoading(false);
    };

    if (selectedLocation) {
      fetchPosts();
    }
  }, [selectedLocation]);

  return (
    <div>
    {loading ? (
        <Image src={loader} height={50} width={45} alt="" />
    ) : (
        <div>
            {selectedLocation && posts.length === 0 ? (
                <p>No posts found in this location</p>
            ) : (
                <div className="">
                    {posts.slice(0, 3).map((post) => (
                        <Card key={post.title} item={post} />
                    ))}
                </div>
            )}
        </div>
    )}
</div>

  );
};

export default FetchedPostsLoc;
