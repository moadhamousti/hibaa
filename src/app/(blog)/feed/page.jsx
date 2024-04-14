import CardList from '@/components/CardList';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';

import CategoryList from '@/components/CategoriesList';
import LocationList from '@/components/LocationList';
import FooterFeed from '@/components/FooterFeed';
import TypeSelect from '@/components/TypeList';
import SmoothScroller from '@/components/SmoothScrool';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import NavbarFeed from '@/components/NavbarFeed';
import NavbarNoMenu from '@/components/NavbarNoMenu';
import NavbarSimple from '@/components/NavbarSimple';


export default function Page({ searchParams }) {

  const {data:session} = getServerSession(authOptions);

  const page = parseInt(searchParams.page) || 1
  const {cat} = searchParams;
  const {loc} = searchParams;
  const {type} = searchParams;


  
  return (
    <>
    {/* <Navbar /> */}
    <NavbarFeed/>



      <div className='min-h-screen bg-bg text-textColor'>
        <div className='max-w-screen-xl mx-auto'>
          <div className="flex justify-between items-center">
            <div className='pt-10'>
              {/* <h1 className="text-4xl font-extrabold tracking-normal"></h1> */}
              <h1 className="text-3xl font-extrabold tracking-normal hidden sm:block">Postes</h1>
            </div>
            {/* <Menu page={page}/> */}
            <div className="flex gap-6">
              <p></p>
              <CategoryList/>
              <LocationList/>
            </div>
          </div>
          
          <div className='flex flex-col items-center pt-8'>
              <div className="w-[140px] ml-auto">
                <TypeSelect />
              </div>
          </div>
            <CardList page={page} cat={cat} loc={loc} type={type}/>

        </div>
        <FooterFeed/>
      </div>
    </>
  )
}
