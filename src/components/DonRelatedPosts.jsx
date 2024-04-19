"use client"

import React, { useState, useEffect } from 'react';
import Card from './Card';
import PageLayout from '@/app/(blog)/layout';

const DonRelatedPosts = ({ category, postId }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const res = await fetch(`https://hibaatae.vercel.app/api/posts/donatePosts/relatedPosts/${category}`);
        if (!res.ok) {
          throw new Error('Failed to fetch related posts');
        }
        const data = await res.json();
        setRelatedPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRelatedPosts();
  }, [category]);

  // Filter relatedPosts based on category and exclude the single post
  const filteredPosts = relatedPosts.filter(post => post.category === category && post.id !== postId);

  // Limit the filteredPosts to only 3 posts
  const limitedPosts = filteredPosts.slice(0, 3);

  return (
    <PageLayout>
      <div>
        <div className="mt-5 mb-5">
          <h2 className='text-2xl font-semibold'>Postes Similaires</h2>
        </div>
        {limitedPosts.length === 0 ? (
          <div className="items-center text-center p-[50px] mb=[40px]">
            <p className=''>Aucun article associé dans la même catégorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {limitedPosts.map((post) => (
              <Card key={post.id} item={post} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default DonRelatedPosts;
