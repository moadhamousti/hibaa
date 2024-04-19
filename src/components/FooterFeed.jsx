"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import FacebookIcon from '../../public/Facebook.svg'; 
import InstagramIcon from '../../public/Instagram.svg';
import TwitterIcon from '../../public/Twitter.svg';
import Image from 'next/image';

const FooterFeed = () => {
  const { data: session } = useSession();

  if (session) {
    return null; 
  }

  return (
    <div className="">
    <div className="mt-10  sm:grid flex flex-col items-center sm:items-start  grid-cols-5 sm:gap-y-24 gap-4 text-gray-500 border-b-2 border-gray-400 pb-8 mb-2">
        <div className="w-full  ">
          <Image src="/logo.svg" alt="Charity blog" className='w-auto h-auto'/>
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
            <Link href="/" className="  text-[--textColor]     "  >
            Donner
            </Link>
          </li>
          <li>
            <Link href="/pharmaForm" className="  text-[--textColor]"  >
            Ajouter votre Pharmacie 
            </Link>
          </li>
        </ul>
        <ul className=' flex flex-col gap-y-1 capitalize items-center lg:items-start '>
            <Link href="" className="  text-[#ef507f]  mb-4     "  >
            À propos 
            </Link>
          <li>
            <Link href="/" className="  text-[--textColor]     "  >
            Qui nous sommes 
            </Link>
          </li>
          <li>
            <Link href="/" className="  text-[--textColor]     "  >
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
              <Link href="/" ><Image src={FacebookIcon} height={30} width={30}  alt="Facebook" className='w-auto h-auto' /></Link>

            </div>
            <div>
            <Link href="/" ><Image src={InstagramIcon} height={30} width={30} alt="Instagram" className='w-auto h-auto' /></Link>

            </div>
            <div>
            <Link  href="/"><Image src={TwitterIcon} height={30} width={30} alt="Tiktok" className='w-auto h-auto' /></Link>

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
          <p className='text-[--softTextColor] text-center'>Copyright © 2024. HEBA&AATAE. All rights reserved.</p>
        </div>
        </div>
  );
};

export default FooterFeed;

