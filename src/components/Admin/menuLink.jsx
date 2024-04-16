

"use client"


import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MenuLink = ({ item, open, activeLink, setActiveLink }) => {
  const pathname = usePathname();

  const handleClick = () => {
    setActiveLink(item.path);
  };

  return (
    <Link href={item.path}>
      <div
        className={`text-sm items-center text-gray-500 flex gap-x-2 cursor-pointer rounded-2xl p-4 ${
          (pathname === item.path || activeLink === item.path) ? 'text-[#EF507F]' : ''
        } ${!open ? 'hover:text-[--pink] mt-5 px-2 p-3 hover:text-[#EF507F]' : ''} hover:text-[#EF507F]`}
        onClick={handleClick}
        style={{ color: (pathname === item.path || activeLink === item.path) ? '#EF507F' : '#6B7280' }} // Adjust the color code accordingly
      >
        <span className='text-2xl block float-left'>
          {item.icon}
        </span>
        <span className={`text-base font-medium flex-1 duration-200 ${!open ? 'hidden' : ''}`}>
          {item.title}
        </span>
      </div>
    </Link>
  );
};

export default MenuLink;







