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
import whatsapp from '../../../public/phone.png'
import MedToolsTypeFilter from '@/components/MedToolsTypeFilter';
import { useDropzone } from 'react-dropzone';
import FileUploader from '@/components/FileUploader';
import PageLayout from '@/app/(blog)/layout';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/lib/firebase';
import { getSession, useSession } from 'next-auth/react';
import uploadIcon from '../../../public/Upload.svg'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import loader from '../../../public/loader.gif'
import { useToast } from "@/components/ui/use-toast"
import Loader from '../Loader';
import './radio.css'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';

const storage = getStorage(app);


const DonPostsForm = () => {

  const { data: session, status } = useSession();
  console.log(session)
  const router = useRouter();
  const [locationCategories, setLocationCategories] = useState([]);
  const [selectedLocationCategory, setSelectedLocationCategory] = useState("");
  const [toolsCategories, setToolsCategories] = useState([]);
  const [selectedToolsCategories, setSelectedToolsCategories] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("https://www.medisave.co.uk/cdn/shop/collections/Tom.jpg?v=1683730716");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [slug, setSlug] = useState("");
  const [location, setlocation] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [locationError, setLocationError] = useState("");





  const [cat, setCat] = useState("");
  const [locCat, setLocCat] = useState("");
  const [phone, setPhone] = useState("");
  const [isWhatsapp, setisWhatsapp] = useState(false);

  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);

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
    setLoading(true); // Start loading
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        setLoading(false); // Stop loading on error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setMedia(downloadURL);
          setLoading(false); // Stop loading on upload complete
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let titleErrorMessage = "";
    let descriptionErrorMessage = "";
    let phoneErrorMessage = "";


    if (title.length < 5) {
      titleErrorMessage = "Le titre doit comporter au moins 5 caractères";
    }

    if (phone.length !== 10 || phone[0] !== '0') {
      phoneErrorMessage = "Le numéro de téléphone doit comporter 10 caractères et commencer par 0";
    }

    if (desc.length < 40) {
      descriptionErrorMessage = "La description doit comporter au moins 38 caractères";
    }

    setTitleError(titleErrorMessage);
    setDescriptionError(descriptionErrorMessage);
    setPhoneError(phoneErrorMessage);


    // If there are errors, prevent form submission
    if (titleErrorMessage || descriptionErrorMessage) {
      return;
    }

    if ( phoneErrorMessage) {
      return;
    }


    if (!selectedToolsCategories) {
      setCategoryError("Veuillez sélectionner une catégorie");
      return; // Prevent form submission
    }

    if (!selectedLocationCategory) {
      setLocationError("Veuillez sélectionner un emplacement");
      return; // Prevent form submission
    }

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
        description: "Donation Poste mis à jour avec succès",
        variant: "success",
        className: "bg-green-500 text-white", 
      });
      router.push('/feed'); 
    } else {
      toast({
        title: "Error",
        description: "Une erreur s'est produite",
        variant: "error",
        className: "bg-red-500 text-white", 
      });
    }
    
  }

  
  

  return (
    <PageLayout>
      
      <div className="max-w-md mx-auto mb-[60px] mt-[50px]">
        <form className="grid gap-4">
          {/* <Label htmlFor="title">Titre</Label>
          <Input id="title" className="bg-gray-100" placeholder="Titre" onChange={e => setTitle(e.target.value)} /> */}

          <div className="space-y-2">
            <Label htmlFor="title">Titre <b className='text-red-600 font-extrabold' title="Ce champs est obligatoire">*</b></Label>
            <Input id="title" className="bg-gray-100" placeholder="Titre" onChange={e => setTitle(e.target.value)} />
            <p className="text-red-600 text-[16px] mb-4">{titleError}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description <b className='text-red-600 font-extrabold' title="Ce champs est obligatoire">*</b></Label>
            <Textarea onChange={e => setDesc(e.target.value)} id="description" placeholder="Description" className="bg-gray-100 w-full h-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            <p className="text-red-600 text-[16px] mb-4">{descriptionError}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone <b className='text-red-600 font-extrabold' title="Ce champs est obligatoire">*</b></Label>
            <Input onChange={e => setPhone(e.target.value)} id="phone" className='bg-gray-100 border-[#B0BAC3]' placeholder="Numéro de téléphone" />
            <p className="text-red-600 text-[16px] mb-4">{phoneError}</p>
          </div>
          {/* <div className='flex gap-3'>
            <Image src={whatsapp} alt='' width={20} height={20}/>
            <span className='text-[16px]'>Est-ce un numéro WhatsApp ?</span>
            <RadioGroup
              aria-label="whatsapp-option"
              name="whatsapp-option"
              value={isWhatsapp ? "yes" : ""}
              onChange={(e) => setisWhatsapp(e.target.value === "yes")}
              
            >
              <div className=''>
                <input 
                  type="radio"
                  className="w-3 h-3 rounded-full border-[#B0BAC3] checked:bg-[#EF507F] checked:border-[#EF507F]"
                  id="whatsapp-yes" 
                  value="yes" 
                  checked={isWhatsapp} 
                  onChange={() => setisWhatsapp(!isWhatsapp)} 
                />
                <Label htmlFor="whatsapp-yes" className="ml-2 mb-1">Yes</Label>
              </div>
            </RadioGroup>
          </div> */}

<div className='flex gap-3'>
  <Image src={whatsapp} alt='' width={20} height={20}/>
  <span className='text-[16px]'>Est-ce un numéro WhatsApp ?</span>
  
  <input 
    type="radio"
    id="whatsapp-yes"
    checked={isWhatsapp === true} 
    name="whatsapp-option"
    value="true"
    onChange={() => setisWhatsapp(true)}
  />
  <label htmlFor="whatsapp-yes" className="">Oui</label>
  
  <input 
    type="radio"
    id="whatsapp-no"
    checked={isWhatsapp === false} 
    name="whatsapp-option"
    value="false"
    onChange={() => setisWhatsapp(false)}
  />
  <label htmlFor="whatsapp-no" className="">Non</label>
</div>



          <Label htmlFor="locationCategory">Choisir une catégorie: <b className='text-red-600 font-extrabold' title="Ce champs est obligatoire">*</b></Label>
          <select
              id="toolsCategory"
              value={selectedToolsCategories}
              className='bg-[#B0BAC31C] px-2 py-2 rounded-[20px]'
              onChange={(e) => setSelectedToolsCategories(e.target.value)}
              onBlur={(e) => setSelectedToolsCategories(e.target.value)} // Handle onBlur event for immediate validation feedback
              required 
            >
              <option value="">Sélect Catégorie</option>
              {/* <option value="">Sélectionner une catégorie d'outils</option> */}
              {toolsCategories.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
            <p className="text-red-600 text-[16px] mb-4">{categoryError}</p>
            

            <Label htmlFor="toolsCategory">Choisir un emplacement: <b className='text-red-600 font-extrabold' title="Ce champs est obligatoire">*</b></Label>
            
            <select
              id="locationCategory"
              value={selectedLocationCategory}
              onChange={(e) => setSelectedLocationCategory(e.target.value)}
              className='bg-[#B0BAC31C] px-2 py-2 rounded-[20px]'
              onBlur={(e) => setSelectedLocationCategory(e.target.value)} // Handle onBlur event for immediate validation feedback
              required 
            >
              <option value="">Sélect Emplacement</option>
              {/* <option value="">Sélectionner une catégorie de lieu</option> */}
              {locationCategories.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
            <p className="text-red-600 text-[16px] mb-4">{locationError}</p>




          <Label htmlFor="toolsCategory">Ajouter une image</Label>
          <span className='text-gray-500 font-light text-[14px]'>(Pour Clarete, il est conseillé d&apos;ajouter une image)</span>


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
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader /> {/* Replace Loader with your loader component */}
            </div>
          ) : file ? (
            <Image
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-full object-cover rounded-md border-2 border-gray-300"
              height={420}
              width={500}
            />
          ) : (
            <div
              className=" w-full h-full flex items-center justify-center border-2 border-dashed border-[#00A4BF] bg-[#F8F8FF] rounded-md"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="column self-center bg-white px-10 py-10" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Image alt="" className="mb-6" src={uploadIcon} width={100} height={100} />
                <p className="text-gray-400 text-center ">
                  Glisser-déposer des fichiers ou <strong className="text-[#00A4BF] font-bold underline">Parcourir</strong>
                </p>
              </div>
            </div>
          )}
        </label>
    </div>
          <button type="submit" className='mt-8 h-[48px] w-[197px] text-base font-normal leading-7 text-white rounded-[20px] bg-[#00A4BF] block mx-auto' onClick={handleSubmit}>Publier</button>
        </form>
      </div>
      {/* <Footer /> */}
    </PageLayout>
  )
}

export default DonPostsForm;