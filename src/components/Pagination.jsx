"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import styles from './pagination.module.css'
const Pagination = ({page,hasPrev, hasNext}) => {

  const router = useRouter()



  return (
    // <div className='flex justify-between mt-8'>
    //     <button 
    //       className={styles.button} 
    //       // disabled={hasPrev}
    //       onClick={() => router.push(`?page=${page - 1}`)} 
    //     >
    //       Previous</button>
    //     <button 
    //       className={styles.button} 
    //       // disabled={hasNext}
    //       onClick={() => router.push(`?page=${page + 1}`)}
    //     >
    //       Next</button>
    // </div>

      <div className="flex mx-auto w-fit gap-5	bottom-0 left-0 right-0 ">
        <button onClick={() => router.push(`?page=${page - 1}`)}  href="#" className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-white bg-black border border-gray-300 rounded-xl hover:bg-gray-100 hover:text-black dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
          <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
          Previous
        </button>
        <button onClick={() => router.push(`?page=${page + 1}`)} className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-white bg-black border border-gray-300 rounded-xl hover:bg-gray-100 hover:text-black dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
          Next
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>
  )
}

export default Pagination