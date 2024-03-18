"use client"


// cardList.jsx
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Pagination from './Pagination';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardList = () => {
  const [loading, setLoading] = useState(true);
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
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Render skeleton cards while loading */}
        {loading ? (
          Array.from({ length: 4 }, (_, index) => <Skeleton count={5} key={index} />)
        ) : (
          // Replace skeleton cards with actual cards after data is fetched
          posts.map(post => <Card key={post.id} post={post} />)
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default CardList;







// // cardList.jsx
// // cardList.jsx
// import React, { useState, useEffect } from 'react';
// import Card from './Card';
// import Pagination from './Pagination';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const CardList = ({ initialPosts }) => {
//   const [loading, setLoading] = useState(true);
//   const [posts, setPosts] = useState(initialPosts); // Set initialPosts as the default posts

//   useEffect(() => {
//     setLoading(false); // Set loading to false when the posts are received
//   }, [initialPosts]); // Trigger useEffect when initialPosts change

//   return (
//     <div className="max-w-screen-xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {/* Render skeleton cards while loading */}
//         {loading ? (
//           Array.from({ length: 4 }, (_, index) => <Skeleton count={5} key={index} />)
//         ) : (
//           // Replace skeleton cards with actual cards after data is fetched
//           posts.map(post => <Card key={post.id} post={post} />)
//         )}
//       </div>
//       <Pagination />
//     </div>
//   );
// };

// export default CardList;