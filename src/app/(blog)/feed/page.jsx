import CardList from '@/components/CardList';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import PageLayout from '../layout';
import Footer from '@/components/Footer';
import Pagination from '@/components/Pagination';

const page = () => {
  // const session = await getServerSession(authOptions);
  // if(session?.user) {
  //   return <h2>Post Page - Welcome back {session?.user.username ? session.user.username : session.user.name}</h2>
  // }
  
  return (
    <>
    <Navbar />
    <div className='min-h-screen bg-bg text-textColor'>
      <div className='max-w-screen-xl mx-auto'>
        <div className=' pt-10 text-center'>
          <h1 className="text-4xl font-extrabold tracking-normal">Posts</h1>
        </div>
        <div className='flex flex-col items-center pt-8 mb-10'>
          <Menu/>
          <CardList/>
        </div>
      </div>
      <Footer/>
    </div>
    
    </>
    
    
    
  )
}

export default page





// "use client"


// import CardList from '@/components/CardList';
// import LocationFilter from '@/components/LocationFilter';
// import MedToolsTypeFilter from '@/components/MedToolsTypeFilter';
// import React, { useState, useEffect } from 'react';

// const page = () => {
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [posts, setPosts] = useState([]);

//   const handleSubmit = async () => {
//     const res = await fetch(`/api/posts/donatePosts?location=${selectedLocation}&category=${selectedCategory}`);
//     const filteredPostsData = await res.json();
//     setPosts(filteredPostsData);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/posts/donatePosts');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setPosts(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className='flex justify-between mb-8 gap-5'>
//         <LocationFilter onChange={(e) => setSelectedLocation(e.target.value)} />
//         <MedToolsTypeFilter onChange={(e) => setSelectedCategory(e.target.value)} />
//         <button onClick={handleSubmit}>Apply Filters</button>
//       </div>
//       <CardList initialPosts={posts} />
//     </>
//   );
// };

// export default page;

