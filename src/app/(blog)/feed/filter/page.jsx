// "use client"
// import React, { useState, useEffect } from 'react';
// import CardList from '@/components/CardList';
// import Menu from '@/components/Menu';
// import Navbar from '@/components/Navbar';
// import { authOptions } from '@/lib/auth'
// import { getServerSession } from 'next-auth'
// import Footer from '@/components/Footer';
// import Pagination from '@/components/Pagination';

// const Page = () => {
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [filteredPosts, setFilteredPosts] = useState([]);

//   const handleFilter = async () => {
//     try {
//       const res = await fetch(`/api/posts/filter?location=${selectedLocation}&category=${selectedCategory}`);
//       if (!res.ok) {
//         throw new Error('Failed to fetch filtered posts');
//       }
//       const data = await res.json();
//       setFilteredPosts(data);
//     } catch (error) {
//       console.error('Error fetching filtered posts:', error);
//     }
//   };

//   useEffect(() => {
//     handleFilter();
//   }, [selectedLocation, selectedCategory]);

//   return (
//     <>
//       <Navbar />
//       <div className='min-h-screen bg-bg text-textColor'>
//         <div className='max-w-screen-xl mx-auto'>
//           <div className='pt-10 text-center'>
//             <h1 className="text-4xl font-extrabold tracking-normal">Posts</h1>
//           </div>
//           <div className='flex flex-col items-center pt-8 mb-10'>
//             <Menu
//               onLocationChange={(location) => setSelectedLocation(location)}
//               onCategoryChange={(category) => setSelectedCategory(category)}
//               onFilter={handleFilter}
//             />
//             <CardList posts={filteredPosts} />
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Page;

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
