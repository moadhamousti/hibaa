"use client"
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {useDebouncedCallback} from "use-debounce"


const Search = ({placeholder}) => {

  const searchParams = useSearchParams();
  const {replace} = useRouter()
  const pathname = usePathname();

  

  console.log(searchParams);
  console.log(pathname)

  const handleSearch =useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", 1)


    if(e.target.value){
      e.target.value.length > 2 && params.set("q", e.target.value)
    }else{
      params.delete("q")
    }
    replace(`${pathname}?${params}`)
  },300);
  return (
    <div className='flex items-center gap-[10px] bg-gray-200 p-[10px] rounded-lg'>
        <SearchIcon/>
        <input className="bg-transparent border-none bg-gray-400" type='text' 
          placeholder={placeholder}
          onChange={handleSearch}
        />
    </div>
  )
}

export default Search