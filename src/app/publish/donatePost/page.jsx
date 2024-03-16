"use client"

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {Button} from  '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select } from '@/components/ui/select';
import React, { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PostTypeFilter from '@/components/PostTypeFilter';
import LocationFilter from '@/components/LocationFilter';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import whatsapp from '../../../../public/Whatsapp.png'
import MedToolsTypeFilter from '@/components/MedToolsTypeFilter';
// import protectRoute from '../auth.config';
import { useDropzone } from 'react-dropzone';
import FileUploader from '@/components/FileUploader';
import PageLayout from '@/app/(blog)/layout';




// Define Zod schema for validation
const postSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(500),
  location: z.string(),
  type: z.enum(['Type A', 'Type B', 'Type C']),
  phone: z.string().min(10).max(15),
  isWhatsapp: z.boolean(),
  email: z.string().email(),
});

const page = () => {
  // const { register, handleSubmit, formState: { errors } } = useForm();
  const [file,setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
};

// const handleFormSubmit = async (e) => {
//   e.preventDefault();

//   if (!file) return;

//   try {
//       const { data, error } = await supabase.storage
//           .from('charity') // Specify your bucket name
//           .upload(`public/${file.name}`, file);

//       if (error) {
//           throw error;
//       }

//       console.log('File uploaded:', data);
//   } catch (error) {
//       console.error('Error uploading file:', error.message);
//   }
// };
// const onSubmit = (data) => {
//   console.log(data); // Handle form submission here
// };

  return (
    <PageLayout>
        <Navbar />
        <div className=' pt-10 text-center mb-10'>
          <h1 className="text-4xl font-extrabold tracking-normal">Create Post</h1>
        </div>
        <div className="max-w-md mx-auto">
          <form className="grid gap-4">
            <Label htmlFor="title">Title</Label>
            <Input id="title" className="bg-gray-200" placeholder="Title" />
            
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Description" className=" bg-gray-200 w-full h-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />

            <Label htmlFor="location">Location</Label>
            <LocationFilter />

            <Label htmlFor="type">Medical equipement type</Label>
            <MedToolsTypeFilter />

            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" className='bg-gray-200' placeholder="Phone Number"/>

            <div className='flex items-start gap-3'>

              <div className='flex gap-2'>
                <Image src={whatsapp} width={22} height={22}/>
                <Label className='mt-1'>This is a  WhatsApp Number</Label>
              </div>
              <RadioGroup className='mt-1'>
                <RadioGroupItem id="option-one" value="option-one" />
              </RadioGroup>
            </div>

            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className='bg-gray-200' placeholder="Email"/>

            {/* <FileUploader/> */}
            <input type='file' id='image' onChange={e=>setfile(e.target.files[0])}/>
            <Button type="submit" className='mt-8'>Submit</Button>
          </form>
        </div>
        <Footer />
    </PageLayout>
  )
}

// export const getServerSideProps = protectRoute; 
export default page