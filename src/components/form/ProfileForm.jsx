"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Form } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ProfileForm = () => {

  const[newEmail, setNewEmail] = useState("")
  const {data: session, status, update} = useSession()
  console.log("this is the session", session)

  return (
    <div className="flex flex-col items-center">
      <h1>Profile</h1>
      <Button
        variant="ghost"
        className="relative h-10 w-10 rounded-full"
        onClick=''
        height={40}
        width={40}
        
      >
        <Avatar className="h-10 w-10 rounded-full">
          <AvatarImage src=' ' alt="" />
          <AvatarFallback>
          </AvatarFallback>
        </Avatar>
        <input id="fileInput" type="file" className="hidden" />
      </Button>
      <Form className="mt-4 w-full max-w-xs">
      <h2>{session?.user.email}</h2>
        {/* <Label>
          Name:
          <Input type='text' placeholder='name' value={newName} onChange={(e) => setNewName(e.target.value)}  />
        </Label>
        <Label>
          Username:
          <Input type='text' placeholder='username' value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
        </Label> */}
        <Label>
          Email:
          <Input type='email' placeholder='email' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        </Label>
          {/* <Label>
            Current Password:
            <Input type="password" name="password"  value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
          </Label> */}
        <button type="submit" onClick={() => update({email: newEmail})} >Update Profile</button>
      </Form>
    </div>
  );
};

export default ProfileForm;




// "use client"


// import { useSession } from 'next-auth/react'
// import React, { useState } from 'react'


// const ProfileForm = () => {
//   const[newName, setNewName] = useState("")
//   const {data: session, status, update} = useSession()
//   console.log("this is the session", session)
//   return (
//     <div>
//       <h2>{session?.user.name}</h2>
//       <input type='text' placeholder='name' value={newName} onChange={(e) => setNewName(e.target.value)}/>
//       <button onClick={() => update({name: newName})}>update</button>
//     </div>
//   )
// }

// export default ProfileForm
