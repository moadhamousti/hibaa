import Link from 'next/link';
import FacebookIcon from '../../public/Facebook.svg'; 
import InstagramIcon from '../../public/Instagram.svg';
import TwitterIcon from '../../public/Twitter.svg';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white w-full py-8 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Charity Link (Top Left) */}
        <div className="mr-4">
          <Link href="/">
            <span className="text-black font-bold">Charity</span>
          </Link>
        </div>

        {/* Top Middle Text */}
        <div className="flex-grow text-center">
          <p className="text-sm text-gray-500">© All Rights Reserved, {new Date().getFullYear()}</p>
        </div>

        {/* Top Right Icons (replace with your SVG imports) */}
        <div className="flex items-center gap-2">
          <Link href="/">
              <Image src={FacebookIcon} alt="Facebook Icon" width={24} height={24} />
          </Link>
          <Link href="/">
              <Image src={InstagramIcon} alt="Instagram Icon" width={24} height={24} />
          </Link>
          <Link href="/">
              <Image src={TwitterIcon} alt="Twitter Icon" width={24} height={24} />
          </Link>
        </div>
      </div>

      {/* Divider Line */}
      <div className="my-8 border-t border-gray-200"></div>

      {/* Links Section (Bottom) */}
      <div className="container mx-auto grid sm:grid-cols-5 md:grid-cols-5 gap-4">
        <div className="flex flex-col gap-4 font-light">
          <span className="font-bold">Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className="flex flex-col gap-4 font-light">
          <span className="font-bold">Community</span>
          <Link href="/">Support</Link>
          <Link href="/">Whats New</Link>
          <Link href="/">Sponsors</Link>
          <Link href="/">Policy</Link>
        </div>
        <div className="flex flex-col gap-4 font-light">
          <span className="font-bold">Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Twitter</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Youtube</Link>
        </div>
        <div className="flex flex-col gap-4 font-light">
          <span className="font-bold">Support</span>
          <Link href="/">Support</Link>
          <Link href="/">Be a sponsor</Link>
          <Link href="/">Support</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;