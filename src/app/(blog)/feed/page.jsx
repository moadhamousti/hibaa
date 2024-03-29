import CardList from '@/components/CardList';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';

import Footer from '@/components/Footer';
import CategoryList from '@/components/CategoriesList';
import LocationList from '@/components/LocationList';


export default function Page({ searchParams }) {


  const page = parseInt(searchParams.page) || 1
  const {cat} = searchParams;
  const {loc} = searchParams;

  
  return (
    <>
    <Navbar />
      <div className='min-h-screen bg-bg text-textColor'>
        <div className='max-w-screen-xl mx-auto'>
          <div className="flex justify-between items-center">
            <div className='pt-10 pl-8'>
              <h1 className="text-4xl font-extrabold tracking-normal">Postes</h1>
            </div>
            {/* <Menu page={page}/> */}
            <div className="flex gap-6">
              <p></p>
              <CategoryList/>
              <LocationList/>
            </div>
          </div>
          <div className='flex flex-col items-center pt-8 mb-10'>
            <CardList page={page} cat={cat} loc={loc}/>
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    </>
  )
}
