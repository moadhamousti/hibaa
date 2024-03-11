import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
  const session = await getServerSession(authOptions);
  if(session?.user) {
    return <h2>Post Page - Welcome back {session?.user.username}</h2>
  }
  return (
    <div>
        <h1>Post Page</h1>
    </div>
  )
}

export default page