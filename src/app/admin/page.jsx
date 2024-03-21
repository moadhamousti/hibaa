import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = () => {
    const session = getServerSession(authOptions)
    console.log(session)
    // if(!session?.user.role !== 'ADMIN') {
    //   throw new Error("You need to be an Admin")
    // }
  return (
    <div>
        this is page admin
    </div>
  )
}

export default page