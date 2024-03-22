import CardList from '@/components/CardList';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';

import Footer from '@/components/Footer';


export default function Page({ searchParams }) {


  const page = parseInt(searchParams.page) || 1
  const { cat , loc} = searchParams;
  
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-bg text-textColor'>
        <div className='max-w-screen-xl mx-auto'>
          <div className=' pt-10 text-center'>
            <h1 className="text-4xl font-extrabold tracking-normal">Posts</h1>
          </div>
          <div className='flex flex-col items-center pt-8 mb-10'>
            <Menu page={page} cat={cat} loc={loc}/>
            <CardList page={page} cat={cat} loc={loc}/>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  )
}
