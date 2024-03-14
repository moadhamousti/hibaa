import React from 'react'
import { Button } from './ui/button'

const Pagination = () => {
  return (
    <div className='flex justify-between mt-8'>
        <Button className=''>Previous</Button>
        <Button className=''>Next</Button>
    </div>
  )
}

export default Pagination