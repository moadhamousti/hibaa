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
import whatsapp from '../../../public/whatsapp.png'
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
import Loader from '../../components/Loader';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';


const storage = getStorage(app);

const getData = async (id) => {
    const res = await fetch(`http://localhost:3000/api/form/${id}`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed");
    }
  
    return res.json();
  };


const PharmaFormUpdate = ({params}) => {

  const { data: session, status } = useSession();


  const { id } = params;


  console.log(session)
  const router = useRouter();
  const [locationCategories, setLocationCategories] = useState([]);
  const [selectedLocationCategory, setSelectedLocationCategory] = useState("");
//   const [toolsCategories, setToolsCategories] = useState([]);
//   const [selectedToolsCategories, setSelectedToolsCategories] = useState("");
const[formData,setFormData] = useState(null);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [desc, setDesc] = useState("");
  const [phaName, setPhaName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");


  const [slug, setSlug] = useState("");
  const [location, setlocation] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [ownerNameError, setOwnerNameError] = useState("");
  const [phaNameError, setPhaNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");






  const [cat, setCat] = useState("");
  const [locCat, setLocCat] = useState("");
  const [phone, setPhone] = useState("");
  const [isWhatsapp, setisWhatsapp] = useState(false);

  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
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
    const fetchData = async () => {
      try {
        const data = await getData(id);
        setFormData(data);
        setPhaName(data.phaName || ""); 
        setOwnerName(data.ownerName || ""); 
        setDesc(data.desc || ""); 
        setPhone(data.phone || ""); 
        setFile(data.file || ""); 
        setisWhatsapp(data.isWhatsapp || false); 
        setAddress(data.address || "");
        setFacebook(data.facebook || "");
        setInstagram(data.instagram || "");
        setTwitter(data.twitter || ""); 
        setLongitude(data.longitude || ""); 
        setLatitude(data.latitude || ""); 
        setSelectedLocationCategory(data.location || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);







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


//   useEffect(() => {
//     const fetchToolsCategories = async () => {
//       try {
//         const res = await fetch("/api/categories", {
//           cache: "no-store",
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const data = await res.json();
//         setToolsCategories(data);
//       } catch (error) {
//         console.error('Error fetching tools categories:', error);
//       }
//     };

//     fetchToolsCategories();
//   }, []);

  if (status === "loading") {
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={loader} height={50} width={45} alt="" />
      </div>
    );
  }


  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation
    let phaNameErrorMessage = "";
    let ownerNameErrorMessage = "";
    let phoneErrorMessage = "";
    let addressErrorMessage = "";
    let descriptionErrorMessage = "";


    if (phaName.length < 4) {
      phaNameErrorMessage = "Pharmacie nom doit comporter au moins 4 caractères";
    }
    if (phone.length !== 10 || phone[0] !== '0') {
      phoneErrorMessage = "Le numéro de téléphone doit comporter 10 caractères et commencer par 0";
    }  

    if (address.trim() === "") {
      addressErrorMessage = "L'adresse est obligatoire";
    }

    if (ownerName.length < 5) {
      ownerNameErrorMessage = "Pharmacie Propriétaire nom doit comporter au moins 5 caractères";
    }
    if (desc.length < 40) {
      descriptionErrorMessage = "La description doit comporter au moins 38 caractères";
    }

    setPhaNameError(phaNameErrorMessage);
    setAddressError(addressErrorMessage);
    setPhoneError(phoneErrorMessage);
    setOwnerNameError(ownerNameErrorMessage);
    setDescriptionError(descriptionErrorMessage);


    // If there are errors, prevent form submission
    if ( descriptionErrorMessage) {
      return;
    }
    if ( addressErrorMessage) {
      return;
    }
    if ( phoneErrorMessage) {
      return;
    }
    if ( ownerNameErrorMessage) {
      return;
    }
    if ( phaNameErrorMessage) {
      return;
    }

    const res = await fetch(`/api/form/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        // title,
        desc,
        phaName,
        address,
        facebook,
        instagram,
        twitter,
        ownerName,
        img: media,
        phone,
        isWhatsapp,
        latitude,
        longitude,
        location: selectedLocationCategory,
        // slug: slugify(title),
        // catSlug: catSlug || "style",
        // category: selectedToolsCategories,
      }),
    });
  

    if (res.ok) {
      toast({
        title: "Success",
        description: "Form updated successfully",
        variant: "success",
        className: "bg-green-500 text-white", 
      });
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
      
      <div className="max-w-md mx-auto mb-[60px] mt-[50px]">
      
      {formData && (
        <form className="grid gap-4">

          <div className="space-y-2">
            <Label htmlFor="phaName">Pharmacie Nom <HoverCard><HoverCardTrigger><b className='text-red-600 font-extrabold'>*</b></HoverCardTrigger><HoverCardContent className='bg-[--pink] text-white text-[14px] text-center'>Ce champs est obligatoire</HoverCardContent></HoverCard></Label>
            <Input value={phaName} id="phaName" className="bg-gray-100"  placeholder="Pharmacie Nom" onChange={e => setPhaName(e.target.value)} />
            <p className="text-red-600 text-[16px] mb-4">{phaNameError}</p>
          </div>


          <div className="space-y-2">
            <Label htmlFor="phaName">Pharmacie Propriétaire <HoverCard><HoverCardTrigger><b className='text-red-600 font-extrabold'>*</b></HoverCardTrigger><HoverCardContent className='bg-[--pink] text-white text-[14px] text-center'>Ce champs est obligatoire</HoverCardContent></HoverCard></Label>
            <Input value={ownerName} id="phaName" className="bg-gray-100" placeholder="Pharmacie owner Name" onChange={e => setOwnerName(e.target.value)} />
            <p className="text-red-600 text-[16px] mb-4">{ownerNameError}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description <HoverCard><HoverCardTrigger><b className='text-red-600 font-extrabold'>*</b></HoverCardTrigger><HoverCardContent className='bg-[--pink] text-white text-[14px] text-center'>Ce champs est obligatoire</HoverCardContent></HoverCard></Label>
            <Textarea value={desc} onChange={e => setDesc(e.target.value)} id="description" placeholder="Description" className="bg-gray-100 w-full h-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            <p className="text-red-600 text-[16px] mb-4">{descriptionError}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone <HoverCard><HoverCardTrigger><b className='text-red-600 font-extrabold'>*</b></HoverCardTrigger><HoverCardContent className='bg-[--pink] text-white text-[14px] text-center'>Ce champs est obligatoire</HoverCardContent></HoverCard></Label>
            <Input value={phone}  onChange={e => setPhone(e.target.value)} id="phone" className='bg-gray-100 border-[#B0BAC3]' placeholder="Numéro de téléphone" />
            <p className="text-red-600 text-[16px] mb-4">{phoneError}</p>
          </div>
          <div className='flex gap-3'>
          <div className='flex gap-3'>
            <Image src={whatsapp} alt='' width={20} height={20}/>
            <span className='text-[16px]'>Est-ce un numéro WhatsApp ?</span>
            <input 
              type="radio"
              id="whatsapp-yes"
              name="whatsapp-option"
            //   value="WHATSAPP" 
              value={isWhatsapp==='WHATSAPP'}
              checked={isWhatsapp === "WHATSAPP"} 
              onChange={() => setisWhatsapp("WHATSAPP")} 
            />
            <label htmlFor="whatsapp-yes" className="">Oui</label>
            <input 
              type="radio"
              id="whatsapp-no"
              name="whatsapp-option"
            //   value="REGULAR" 
            value={isWhatsapp==='REGULAR'}
              checked={isWhatsapp === "REGULAR"} 
              onChange={() => setisWhatsapp("REGULAR")} 
            />
            <label htmlFor="whatsapp-no" className="">Non</label>
          </div>
            
          </div>


          {/* <Label htmlFor="locationCategory">Choisir une catégorie:</Label>
          <select
              id="toolsCategory"
              value={selectedToolsCategories}
              className='bg-[#B0BAC31C] px-2 py-2 rounded-[20px]'
              onChange={(e) => setSelectedToolsCategories(e.target.value)}
              onBlur={(e) => setSelectedToolsCategories(e.target.value)} 
              required 
            >
              <option value="">Select Category</option>
              {toolsCategories.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
            <p className="text-red-600 text-[16px] mb-4">{categoryError}</p> */}

          <div className="space-y-2">
            <Label htmlFor="address">Address <HoverCard><HoverCardTrigger><b className='text-red-600 font-extrabold'>*</b></HoverCardTrigger><HoverCardContent className='bg-[--pink] text-white text-[14px] text-center'>Ce champs est obligatoire</HoverCardContent></HoverCard></Label>
            <Input value={address} id="address" className="bg-gray-100" placeholder="Address" onChange={e => setAddress(e.target.value)} />
            <p className="text-red-600 text-[16px] mb-4">{addressError}</p>
          </div>
            

            <Label htmlFor="toolsCategory">Choisir un emplacement: <HoverCard><HoverCardTrigger><b className='text-red-600 font-extrabold'>*</b></HoverCardTrigger><HoverCardContent className='bg-[--pink] text-white text-[14px] text-center'>Ce champs est obligatoire</HoverCardContent></HoverCard></Label>
            
            <select
              id="locationCategory"
              value={selectedLocationCategory}
              onChange={(e) => setSelectedLocationCategory(e.target.value)}
              className='bg-[#B0BAC31C] px-2 py-2 rounded-[20px]'
              onBlur={(e) => setSelectedLocationCategory(e.target.value)} // Handle onBlur event for immediate validation feedback
              required 
            >
              <option value={location}>Sélect Emplacement</option>
              {/* <option value="">Sélectionner une catégorie de lieu</option> */}
              {locationCategories.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
            <p className="text-red-600 text-[16px] mb-4">{locationError}</p>


            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook Lien</Label>
              <Input value={facebook} id="facebook" className="bg-gray-100" placeholder="Facebook" onChange={e => setFacebook(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter Lien</Label>
              <Input value={twitter} id="twitter" className="bg-gray-100" placeholder="Twitter" onChange={e => setTwitter(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram Lien</Label>
              <Input value={instagram} id="instagram" className="bg-gray-100" placeholder="Instagram" onChange={e => setInstagram(e.target.value)} />
            </div>



            <div className="p-5 bg-gray-100 rounded-sm">

              <p className='mb-4 text-gray-600'>Pour afficher votre Pharmacie sur la carte, veuillez saisir sa localisation  <b className='text-[--pink]'>Latitude</b> et <b className='text-[--pink]'>Longitude</b> ci-dessous.</p>
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  value={latitude}  
                  id="latitude"
                  className="bg-white "
                  placeholder="Latitude"
                  onChange={e => setLatitude(e.target.value)}  // Ensure that setLatitude updates the latitude state variable
                />
              </div>

              <div className="space-y-2 mt-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  value={longitude}  // Ensure that the value attribute is bound to the longitude state variable
                  id="longitude"
                  className="bg-white text-black"
                  placeholder="Longitude"
                  onChange={e => setLongitude(e.target.value)}  // Ensure that setLongitude updates the longitude state variable
                />
              </div>
            </div>




          <Label htmlFor="toolsCategory">Ajouter une image</Label>


          <div className='flex flex-col items-center justify-center'>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="hidden" // Hide on medium and large screens
                  />
                  {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Loader /> {/* Replace Loader with your loader component */}
                    </div>
                  ) : (
                    <>
                      {file ? (
                        <label htmlFor="image" className="cursor-pointer">
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-md border-2 border-gray-300"
                          />
                        </label>
                      ) : formData && formData.img ? (
                        <label htmlFor="image" className="cursor-pointer">
                          <img
                            src={formData.img}
                            alt="Current Image"
                            className="w-full h-full object-cover rounded-md border-2 border-gray-300"
                          />
                        </label>
                      ) : (
                        <div
                          className="w-[430px] h-full flex items-center justify-center border-2 border-dashed border-[#00A4BF] bg-[#F8F8FF] rounded-md"
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                        >
                          <label htmlFor="image" className="cursor-pointer">
                            <div className='column self-center bg-white px-10 py-10' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <Image className='mb-6' src={uploadIcon} width={100} height={100} />
                              <p className="text-gray-400">Glisser-déposer des fichiers ou <strong className='text-[#00A4BF] font-bold underline'>Parcourir</strong></p>
                            </div>
                          </label>
                        </div>
                      )}
                    </>
                  )}
                </div>
          <button type="submit" className='mt-8 h-[48px] w-[197px] text-base font-normal leading-7 text-white rounded-[20px] bg-[#00A4BF] block mx-auto' onClick={handleUpdate}>Modifier</button>
        </form>
        )}
      </div>
      {/* <Footer /> */}
    </PageLayout>
  )
}

export default PharmaFormUpdate;

