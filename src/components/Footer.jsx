
import Link from 'next/link';
import FacebookIcon from '../../public/Fb.svg'; 
import InstagramIcon from '../../public/In.svg';
import TwitterIcon from '../../public/x.svg';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const Footer = () => {
  

  return (
    <div className="">
    <div className="mt-10  sm:grid flex flex-col items-center sm:items-start  grid-cols-5 sm:gap-y-24 gap-4 text-gray-500 border-b-2 border-gray-400 pb-8 mb-2">
        <div className="w-full flex items-center justify-center sm:justify-start">
          <Link href="/">
            <Image src="/logo.svg" alt="Charity blog" className="w-auto h-auto" height={30} width={125} />
          </Link>
        </div>

        <div className='sm:text-start text-center '>
          <p className='word-wrap'>
          HIBA&AATAE , votre solution en ligne pour accéder gratuitement aux équipements médicaux essentiels
          </p>
        </div>
        <ul className=' flex flex-col lg:ml-10 gap-y-1 capitalize items-center lg:items-start '>
            <Link href="" className="  text-[#ef507f] capitalize mb-4     "  >
            Services
            </Link>
          <li>
            <Link href="/publish/donatePost" className="  text-[--textColor]     "  >
            Donner
            </Link>
          </li>
          <li>
            <Link href="/pharmaForm" className="  text-[--textColor]     "  >
            Ajouter votre Pharmacie 
            </Link>
          </li>
        </ul>
        <ul className=' flex flex-col gap-y-1 capitalize items-center lg:items-start '>
            <Link href="" className="  text-[#ef507f]  mb-4     "  >
            À propos 
            </Link>
          <li>
            <Link href="/about" className="  text-[--textColor]     "  >
            Qui nous sommes 
            </Link>
          </li>
          <li>
            <Link href="/about" className="  text-[--textColor]     "  >
            Notre vision
            </Link>
          </li>
        </ul>
        <div className='flex flex-col gap-y-1 capitalize items-center'>
            <Link href="" className="  text-[#ef507f]  mb-4     "  >
            Suivez-nous 
            </Link>
            <div className='flex gap-2'>

          <div className="flex items-center gap-2">
            <div>
              <Link href="https://www.facebook.com/profile.php?id=61558213481300" ><Image src={FacebookIcon} height={30} width={30}  alt="Facebook" className='w-auto h-auto' /></Link>

            </div>
            <div>
            <Link href="https://www.instagram.com/hibaxaata/" ><Image src={InstagramIcon} height={30} width={30} alt="Instagram" className='w-auto h-auto' /></Link>

            </div>
            <div>
            <Link  href="https://twitter.com/HibaAata"><Image src={TwitterIcon} height={30} width={30} alt="Tiktok" className='w-auto h-auto' /></Link>

            </div>
          </div>
          </div>
        </div>
        {/* <div className="flex mt-2 gap-2">
          <Link href="/" ><Image src="/facebook.png"   alt="Facebook" width={44} height={44} /></Link>
          <Link href="/" ><Image src="/instagram.png" alt="Instagram" width={44} height={44} /></Link>
          <Link  href="/"><Image src="/twitter.png" alt="Tiktok" width={44} height={44} /></Link>
        </div> */}
      {/* </div> */}



    </div>
        <div className='py-4'>
          <p className='text-[--softTextColor] text-center'>Copyright © Tous droits réservés, {new Date().getFullYear()}</p>
        </div>
        </div>
  );
};

export default Footer;

