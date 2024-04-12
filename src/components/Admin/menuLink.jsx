"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';

const MenuLink = ({ item, open }) => {
  const pathname = usePathname()

  return (
    <Link href={item.path} className={`text-sm text-[#B1B1B1] items-center flex gap-[20px] cursor-pointer rounded-2xl p-3  ${!open && 'mt-5 px-2 p-3  hover:border hover:border-[--pink] '} hover:bg-[--pink] `}>
      <span className='text-2xl block float-left'>
        {item.icon}
      </span>
      <span className={`text-base text-[#B1B1B1]  font-medium flex-1 duration-200 ${!open && 'hidden '}`}>
        {item.title}
      </span>
    </Link>
  )
}

export default MenuLink;