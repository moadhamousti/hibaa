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
import Whatsapp from '../../../../public/phone.png'
import MedToolsTypeFilter from '@/components/MedToolsTypeFilter';
import { useDropzone } from 'react-dropzone';
import FileUploader from '@/components/FileUploader';
import PageLayout from '@/app/(blog)/layout';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/lib/firebase';
import { getSession, useSession } from 'next-auth/react';
import uploadIcon from '../../../../public/Upload.svg'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import loader from '../../../../public/loader.gif'
import { useToast } from "@/components/ui/use-toast"


const FormSchema = z.object({
  title: z.string().min(8, 'title too short'),
  description : z.string().min(25, 'Description must be more than 25 characters'),
  phone: z.string().max(10, 'the phone must have 10 digits'),
});

const storage = getStorage(app);


const Page = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      phone: '',
    },
  });

  const { data: session, status } = useSession();
  console.log(session)
  const router = useRouter();
  const [locationCategories, setLocationCategories] = useState([]);
  const [selectedLocationCategory, setSelectedLocationCategory] = useState("");
  const [toolsCategories, setToolsCategories] = useState([]);
  const [selectedToolsCategories, setSelectedToolsCategories] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [slug, setSlug] = useState("");
  const [location, setlocation] = useState("");


  const [cat, setCat] = useState("");
  const [locCat, setLocCat] = useState("");
  const [phone, setPhone] = useState("");
  const [isWhatsapp, setisWhatsapp] = useState(false);

  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const { toast } = useToast();
  
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

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
  }, [file]);


  useEffect(() => {
    const fetchLocationCategories = async () => {
      try {
        const res = await fetch("/api/location", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setLocationCategories(data);
      } catch (error) {
        console.error('Error fetching location categories:', error);
      }
    };

    fetchLocationCategories();
  }, []);


  useEffect(() => {
    const fetchToolsCategories = async () => {
      try {
        const res = await fetch("/api/categories", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setToolsCategories(data);
      } catch (error) {
        console.error('Error fetching tools categories:', error);
      }
    };

    fetchToolsCategories();
  }, []);

  if (status === "loading") {
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={loader} height={50} width={45} alt="" />
      </div>
    );
  }


  // const slugify = (str) =>
  //   str
  //     .toLowerCase()
  //     .replace(/[^\w\s-]/g, '')
  //     .replace(/[\s_-]+/g, '-')
  //     .replace(/^-+|-+$/g, '')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/publish/donatePost", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc,
        img: media,
        phone,
        isWhatsapp,
        location: selectedLocationCategory,
        // slug: slugify(title),
        // catSlug: catSlug || "style",
        category: selectedToolsCategories,
      }),
    });
  

    if (res.ok) {
      toast({
        title: "Success",
        description: "Post added successfully",
        variant: "success",
        className: "bg-green-500 text-white", 
      });
      router.push('/feed'); 
    } else {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "error",
        className: "bg-red-500 text-white", 
      });
    }
    
  }

  
  

  return (
    <PageLayout>
      <Navbar />
      <div className='pt-10 text-center mb-10'>
        <h1 className="text-4xl font-extrabold tracking-normal">Edit Post</h1>
      </div>
      <div className="max-w-md mx-auto">
        <form className="grid gap-4">
          <Label htmlFor="title">Title</Label>
          <Input id="title" className="bg-gray-200" placeholder="Title" onChange={e => setTitle(e.target.value)} />

          <Label htmlFor="description">Description</Label>
          <Textarea onChange={e => setDesc(e.target.value)} id="description" placeholder="Description" className="bg-gray-200 w-full h-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />


          <label htmlFor="locationCategory">Select Location Category:</label>
        <select
          id="locationCategory"
          value={selectedLocationCategory}
          onChange={(e) => setSelectedLocationCategory(e.target.value)}
        >
          {/* <option value="">Select a location category</option> */}
          {locationCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>

        <label htmlFor="toolsCategory">Select Tools Category:</label>
          <select
            id="toolsCategory"
            value={selectedToolsCategories}
            onChange={(e) => setSelectedToolsCategories(e.target.value)}
          >
            {/* <option value="">Select a tools category</option> */}
            {toolsCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>

          <Label htmlFor="phone">Phone</Label>
          <Input onChange={e => setPhone(e.target.value)} id="phone" className='bg-gray-200' placeholder="Phone Number" />
          <div className='flex gap-3'>
            <Image src={Whatsapp} alt='' width={20} height={20}/>
            <span>Is this a whatsapp Number?</span>
            <RadioGroup
              aria-label="whatsapp-option"
              name="whatsapp-option"
              value={isWhatsapp ? "yes" : ""}
              onChange={(e) => setisWhatsapp(e.target.value === "yes")}
              
            >
              <div className=''>
                <input 
                  type="radio" 
                  id="whatsapp-yes" 
                  value="yes" 
                  checked={isWhatsapp} 
                  onChange={() => setisWhatsapp(!isWhatsapp)} 
                />
                <Label htmlFor="whatsapp-yes" className="ml-2 mb-1">Yes</Label>
              </div>
            </RadioGroup>
          </div>

          {/* <input type='file' id='image' onChange={e => setFile(e.target.files[0])} /> */}

          <div className="flex flex-col items-center justify-center">
      <label htmlFor="image" className="relative">
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="hidden"
        />
        {file ? (
          <Image
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-full h-full object-cover rounded-md border-2 border-gray-300"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className='column self-center bg-white px-10 py-10' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Image className='mb-6' src={uploadIcon} width={100} height={100} alt=''/>
              <p className="text-gray-400">Drag and drop files here or click to <strong className='text-blue-500 font-bold'>browse</strong></p>
            </div>

          </div>
        )}
      </label>
    </div>
          <Button type="submit" className='mt-8' onClick={handleSubmit}>Edit Post</Button>
        </form>
      </div>
      <Footer />
    </PageLayout>
  )
}

export default Page;