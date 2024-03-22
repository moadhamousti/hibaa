// "use client"

// import { useState } from "react";
// import { useSession } from "next-auth/react";
// import { Button } from "../ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Form } from "../ui/form";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";

// const ProfileForm = () => {

//   const[newEmail, setNewEmail] = useState("")
//   const[newName, setNewName] = useState("")

//   const {data: session, status, update} = useSession()
//   console.log("this is the session", session)

//   return (
//     <div className="flex flex-col items-center">
//       <h1>Profile</h1>
//       <Button
//         variant="ghost"
//         className="relative h-10 w-10 rounded-full"
//         onClick=''
//         height={40}
//         width={40}
        
//       >
//         <Avatar className="h-10 w-10 rounded-full">
//           <AvatarImage src=' ' alt="" />
//           <AvatarFallback>
//           </AvatarFallback>
//         </Avatar>
//         <input id="fileInput" type="file" className="hidden" />
//       </Button>
//       <Form className="mt-4 w-full max-w-xs">
//       <h2>{session?.user.name}</h2>
//         <Label>
//           Name:
//           <Input type='text' placeholder='name' value={newName} onChange={(e) => setNewName(e.target.value)}  />
//         </Label>
//         {/* <Label>
//           Username:
//           <Input type='text' placeholder='username' value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
//         </Label> */}
//         {/* <Label>
//           Email:
//           <Input type='email' placeholder='email' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
//         </Label> */}
//           {/* <Label>
//             Current Password:
//             <Input type="password" name="password"  value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
//           </Label> */}
//         <button type="submit" onClick={() => update({name: newName})} >Update Profile</button>
//       </Form>
//     </div>
//   );
// };

// export default ProfileForm;




"use client"


import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


const ProfileForm = () => {
  const[newName, setNewName] = useState("")
  const[newUserName, setNewUserName] = useState("")
  const[newImage, setNewImage] = useState("")
  const [newEmail, setNewEmail] = useState('');

  const {data: session, status, update} = useSession()
  console.log("this is the session", session)

  const hasImage = session?.user?.image?.startsWith('https://lh3.googleusercontent.com/');

  // Check if the session user has no image or the image doesn't start with the specified URL prefix
  const hasNoImage = !hasImage;
  const [email, setEmail] = useState(hasNoImage ? (session?.user?.email ?? '') : '');

  
  // Modify the email value based on the condition
  const emailValue = hasNoImage ? (session?.user?.email ?? '') : session?.user?.email;
  const disableEmailChange = !hasNoImage;
  return (
    <div className="flex flex-col items-center">
      <h2>{session?.user.name}</h2>
      <h2>{session?.user.username}</h2>


      {/* <input type='email' placeholder='email' value={session?.user.email}/> */}

      {hasNoImage && (
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={emailValue} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
      )}



      <Label htmlFor="title"></Label>
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
