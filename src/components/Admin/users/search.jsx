import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Search = ({placeholder}) => {
  return (
    <div className='flex items-center gap-[10px] bg-gray-200 p-[10px] rounded-lg'>
        <SearchIcon/>
        <input className="bg-transparent border-none bg-gray-400" type='text' placeholder={placeholder}/>
    </div>
  )
}

export default Search