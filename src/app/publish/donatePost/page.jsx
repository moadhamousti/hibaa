"use client"

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from  '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select } from '@/components/ui/select';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PostTypeFilter from '@/components/PostTypeFilter';
import LocationFilter from '@/components/LocationFilter';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import whatsapp from '../../../../public/Whatsapp.png'
import MedToolsTypeFilter from '@/components/MedToolsTypeFilter';
import { useDropzone } from 'react-dropzone';
import FileUploader from '@/components/FileUploader';
import PageLayout from '@/app/(blog)/layout';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/lib/firebase';
import { useSession } from 'next-auth/react';



const storage = getStorage(app);

const Page = () => {
  const { status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cat, setCat] = useState("");
  const [locCat, setLocCat] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");



  useEffect(() => {
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };
    file && upload();
  }, [file])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/publish/donatePost", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        images: [media],
        slug: slugify(title),
        cat: { connect: { slug: cat } },
        locCat: { connect: { slug: locCat } },
        phone,        
      }),
    });
    console.log(res)
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    router.push("/")
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

  return (
    <PageLayout>
      <Navbar />
      <div className='pt-10 text-center mb-10'>
        <h1 className="text-4xl font-extrabold tracking-normal">Create Post</h1>
      </div>
      <div className="max-w-md mx-auto">
        <form className="grid gap-4">
          <Label htmlFor="title">Title</Label>
          <Input id="title" className="bg-gray-200" placeholder="Title" onChange={e => setTitle(e.target.value)} />

          <Label htmlFor="description">Description</Label>
          <Textarea onChange={e => setDescription(e.target.value)} id="description" placeholder="Description" className="bg-gray-200 w-full h-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />

          <Label htmlFor="location">Location</Label>
          <LocationFilter onChange={(e) => setLocCat(e.target.value)} />

          <Label htmlFor="type">Medical equipment type</Label>
          <MedToolsTypeFilter onChange={(e) => setCat(e.target.value)} />

          <Label htmlFor="phone">Phone</Label>
          <Input onChange={e => setPhone(e.target.value)} id="phone" className='bg-gray-200' placeholder="Phone Number" />

          <input type='file' id='image' onChange={e => setFile(e.target.files[0])} />
          <Button type="submit" className='mt-8' onClick={handleSubmit}>Submit</Button>
        </form>
      </div>
      <Footer />
    </PageLayout>
  )
}

export default Page;