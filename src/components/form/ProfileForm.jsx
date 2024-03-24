"use client"

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const ProfileForm = () => {
  const [newName, setNewName] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newImage, setNewImage] = useState('');
  const [imagePreview, setImagePreview] = useState("");

  const { data: session, status, update } = useSession();
  console.log(session)

  useEffect(() => {
    if (session) {
      setNewName(session.user.name);
      setNewUserName(session.user.username);
      setNewEmail(session.user.email);
      setImagePreview(session.user.image);
    }
  }, [session]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', newName);
    formData.set('username', newUserName);
    formData.set('email', newEmail);
    formData.set('image', newImage);

    // Perform the form submission or update action here
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };

    setNewImage(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="flex justify-center gap-[100px] ">
      <div className='column'>
        <div className='text-left'>
          <h1 className="text-4xl font-extrabold tracking-normal">Posts</h1>
        </div>
        <div className='mt-7'>
          <img
            className="w-20 h-20 rounded-full mb-4"
            src={imagePreview}
            alt="Profile"
          />
          <label
            htmlFor="profile-image"
            className="block mt-2 px-4 py-2 bg-gray-200 rounded-md cursor-pointer text-center"
          >
            Upload Image
            <input
              id="profile-image"
              type="file"
              alt=''
              accept="image/*"
              onChange={onChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div  className="flex flex-col gap-4">
        <Label htmlFor="name">Name:</Label>
        <Input
          id="name"
          type="text"
          placeholder="Name"
          className='w-full'
          value={newName || ''} // Ensure this value is always defined
          onChange={(e) => setNewName(e.target.value)}
        />
        <Label htmlFor="name">Username:</Label>

        <Input
          id="username"
          type="text"
          placeholder="Username"
          value={newUserName || ''} // Ensure this value is always defined
          onChange={(e) => setNewUserName(e.target.value)}
        />

      <Label htmlFor="name">Email:</Label>

        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={newEmail || ''} // Ensure this value is always defined
          onChange={(e) => setNewEmail(e.target.value)}
        />

        
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => update( {username: newUserName}, {name: newName}, {email: newEmail})} >update</button>
      </div>
    </div>
  );
};

export default ProfileForm;
