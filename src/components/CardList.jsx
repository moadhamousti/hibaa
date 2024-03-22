import React from 'react';
import Card from './Card';
import Pagination from './Pagination';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const getData = async ({ page }) => {
  const res = await fetch(`http://localhost:3000/api/posts/donatePosts?page=${page}`,{
    cache: "no-store",
  });

  if(!res.ok) {
    throw new Error("Could not load posts");
  }

  return res.json();
}



const CardList = async ({ page }) => {
  const data = await getData({ page });
  
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {data && data.map((item) => (
          <Card item={item} key={item._id}/>
        ))}
      </div>
      <Pagination page={page} />
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






// import React from 'react';
// import Card from './Card';
// import Pagination from './Pagination';
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'


// const getData = async ({ page }) => {
//   const res = await fetch(`http://localhost:3000/api/posts/donatePosts?page=${page}`,{
//     cache: "no-store",
//   });

//   if(!res.ok) {
//     throw new Error("Could not load posts");
//   }

//   return res.json();
// }



// const CardList = async ({ page }) => {
//   const {posts,count} = await getData({ page });

//   const POST_PER_PAGE = 2;

//   const hasPrev = POST_PER_PAGE * (page - 1) > 0;
//   const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;
  
//   return (
//     <div className="max-w-screen-xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
//         {posts?.map((item) => (
//           <Card item={item} key={item._id}/>
//         ))}
//       </div>
//       <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
//     </div>
//   );
// };

// export default CardList;