"use client"


import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


const ProfileForm = () => {

  return (
    <div>
      <Input id="title" className="bg-gray-200 mb-3"/>
      <Input type='text' placeholder="name" value={newName} onChange={(e) => setNewName(e.target.value)}/>
      <Input type='text' placeholder="username" value={newUserName} onChange={(e) => setNewUserName(e.target.value)}/>
      
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setNewImage(e.target.files[0])}
      />

      <Button onClick={() => update( {username: newUserName}, {name: newName})}>update</Button>
    </div>
  )
}

export default ProfileForm
