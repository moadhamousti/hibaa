"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PageLayout from '@/app/(blog)/layout';
import { Button } from '@/components/ui/button';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/lib/firebase';
import loader from '../../../public/loader.gif'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import uploadIcon from '../../../public/Upload.svg'
import Loader from '../Loader';
import whatsapp from '../../../public/phone.png'
import { useToast } from "@/components/ui/use-toast"
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';







const storage = getStorage(app);

const getData = async (id) => {
  const res = await fetch(`https://hibaatae.vercel.app/api/posts/reqPost/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const RequestPostFormUpdate = ({ params }) => {
    const { data: session, status } = useSession();
  console.log(session)
  const { id } = params;
  const [postData, setPostData] = useState(null);
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [phone, setPhone] = useState('');
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [selectedLocationCategory, setSelectedLocationCategory] = useState('');
  const [media, setMedia] = useState('');
  const [file, setFile] = useState(null);
  const [locationCategories, setLocationCategories] = useState([]);
  const [toolsCategories, setToolsCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  


  const [selectedToolsCategories, setSelectedToolsCategories] = useState("");


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
        setPostData(data);
        setTitle(data.title);
        setDesc(data.desc);
        setPhone(data.phone);
        setIsWhatsapp(data.isWhatsapp);
        setSelectedLocationCategory(data.location);
        setSelectedToolsCategories(data.category);
        setMedia(data.img);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

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

  if (status === "loading") {
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={loader} height={50} width={45} alt="" />
      </div>
    );
  }

  const handleUpdatePost = async (e) => {
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

    if (desc.length < 38) {
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

    try {
      const response = await fetch(`https://hibaatae.vercel.app/api/posts/reqPost/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
          phone,
          isWhatsapp,
          location: selectedLocationCategory,
          category: selectedToolsCategories,
          img: media, // Assuming you have media state for image
        }),
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Demande Poste mis à jour avec succès",
          variant: "success",
          className: "bg-green-500 text-white", 
        });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite",
          variant: "error",
          className: "bg-red-500 text-white", 
        });
      }

      // Handle success, for example, redirect to another page
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <PageLayout>
        <div>
          <div className='max-w-md mx-auto mb-[60px] mt-[50px]'>
            {postData && (
              <form className='max-w-md mx-auto gap-4'>
                <Label htmlFor="title">Titre <b className='text-red-600 font-extrabold' title="Ce champs est obligatoire">*</b></Label>
                <Input id="Titre" className="bg-gray-100 mb-3" 
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className="text-red-600 text-[16px] mb-4">{titleError}</p>

                <Label htmlFor="title">Description <b className='text-red-600 font-extrabold' title="Ce champs est obligatoire">*</b></Label>
                <Textarea
                  id="desc"
                  className="mb-3 bg-gray-100 w-full h-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <p className="text-red-600 text-[16px] mb-4">{descriptionError}</p>


              <div className='mt-3'>
                <Label htmlFor="locationCategory">Choisir un emplacement: <b className='text-red-600 font-extrabold' title="Ce champs est obligatoire">*</b></Label>
                  <select
                    id="locationCategory"
                    value={selectedLocationCategory}
                    className='bg-[#B0BAC31C] px-2 py-2 rounded-[20px] w-full'


                    onChange={(e) => {
                      console.log('Selected value:', e.target.value);
                      setSelectedLocationCategory(e.target.value);
                    }}
                  >
                    {locationCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-600 text-[16px] mb-4">{locationError}</p>

                </div>
                <div className='mt-3'>
                <Label htmlFor="toolsCategory">Choisir une catégorie: <b className='text-red-600 font-extrabold' title="Ce champs est obligatoire">*</b></Label>
                <select 
                  id="toolsCategory"
            className='bg-[#B0BAC31C] px-2 py-2 rounded-[20px] w-full'

                  value={selectedToolsCategories}
                  onChange={(e) => {
                    console.log('Selected value:', e.target.value);
                    setSelectedToolsCategories(e.target.value);
                  }}
                >
                  {toolsCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <p className="text-red-600 text-[16px] mb-4">{categoryError}</p>

                </div>

                <div className="mt-3">
                <div className="space-y-2">
                <Label htmlFor="title">Numéro de téléphone <b className='text-red-600 font-extrabold' title="Ce champs est obligatoire">*</b></Label>
                  <Input
                    id="phone"
                    className="bg-gray-100"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <p className="text-red-600 text-[16px] mb-4">{phoneError}</p>
                </div>

                {/* <div className='flex gap-3 mt-2 mb-4'>
                   <img src="/whatsapp.png" alt='' width={18} height={18} />
                   <span className='text-[14px] '>Est-ce un numéro WhatsApp ?</span>
                   <input
                    type="radio"
                    checked={isWhatsapp}
                    onChange={(e) => setIsWhatsapp(e.target.checked)}
                    
                  />
                </div> */}
                <div className='flex gap-3 mt-4 mb-6'>
                  <Image src={whatsapp} alt='' width={20} height={20}/>
                  <span className='text-[16px]'>Est-ce un numéro WhatsApp ?</span>
                  
                  <input 
                    type="radio"
                    id="whatsapp-yes"
                    checked={isWhatsapp === true} 
                    name="whatsapp-option"
                    value="true"
                    onChange={() => setIsWhatsapp(true)}
                  />
                  <label htmlFor="whatsapp-yes" className="">Yes</label>
                  
                  <input 
                    type="radio"
                    id="whatsapp-no"
                    checked={isWhatsapp === false} 
                    name="whatsapp-option"
                    value="false"
                    onChange={() => setIsWhatsapp(false)}
                  />
                  <label htmlFor="whatsapp-no" className="">No</label>
                </div>
                </div>
                <Label htmlFor="toolsCategory">Ajouter une image</Label>
                <div className='flex flex-col items-center justify-center mt-4'>
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
                          <Image
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-md border-2 border-gray-300"
                            height={420}
                            width={500}
                          />
                        </label>
                      ) : postData && postData.img ? (
                        <label htmlFor="image" className="cursor-pointer">
                          <Image
                            src={postData.img}
                            alt="Current Image"
                            className="w-full h-full object-cover rounded-md border-2 border-gray-300"
                            height={420}
                            width={500}
                          />
                        </label>
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center border-2 border-dashed border-[#00A4BF] bg-[#F8F8FF] rounded-md"
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                        >
                          <label htmlFor="image" className="cursor-pointer">
                            <div className='column self-center bg-white px-10 py-10' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <Image className='mb-6' src={uploadIcon} width={100} height={100} alt=''/>
                              <p className="text-gray-400 text-center">Glisser-déposer des fichiers ou <strong className='text-[#00A4BF] font-bold underline'>Parcourir</strong></p>
                            </div>
                          </label>
                        </div>
                      )}
                    </>
                  )}
                </div>


 

               
                <div className='mt-8 grid gap-9'>
                    <button type="submit" className='mt-8 h-[48px] w-[197px] text-base font-normal leading-7 text-white rounded-[20px] bg-[#00A4BF] block mx-auto' onClick={handleUpdatePost}>Modfier</button>

                </div>
              </form>
            )}
        </div>
        {/* <Footer /> */}
      </div>
      
    </PageLayout>
  );
};

export default RequestPostFormUpdate;















// "use client"
// import Footer from '@/components/Footer';
// import Navbar from '@/components/Navbar';
// import React, { useState, useEffect } from 'react';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import whatsapp from '../../../../../public/whatsapp.png'
// import { Button } from '@/components/ui/button';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { app } from '@/lib/firebase';


// const storage = getStorage(app);
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



// const getData = async (id) => {
//   const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };

// const Page = ({ params }) => {
  // const { id } = params;
  // const [postData, setPostData] = useState(null);
  // const [title, setTitle] = useState('');
  // const [desc, setDesc] = useState('');
  // const [phone, setPhone] = useState('');
  // const [isWhatsapp, setIsWhatsapp] = useState(false);
  // const [selectedLocationCategory, setSelectedLocationCategory] = useState('');
  // const [selectedToolsCategories, setSelectedToolsCategories] = useState('');
  // const [media, setMedia] = useState('');
  // const [file, setFile] = useState(null);
  // const [locationCategories, setLocationCategories] = useState([]);





//    const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFile = e.dataTransfer.files[0];
//     setFile(droppedFile);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getData(id);
//         setPostData(data);
//         setTitle(data.title);
//         setDesc(data.desc);
//         setPhone(data.phone);
//         setIsWhatsapp(data.isWhatsapp);
//         setSelectedLocationCategory(data.location);
//         setSelectedToolsCategories(data.category);
//         setMedia(data.img);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [id]);


//   useEffect(() => {
//     const fetchLocationCategories = async () => {
//       try {
//         const res = await fetch("/api/location", {
//           cache: "no-store",
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const data = await res.json();
//         setLocationCategories(data);
//       } catch (error) {
//         console.error('Error fetching location categories:', error);
//       }
//     };

//     fetchLocationCategories();
//   }, []);



  // useEffect(() => {
  //   const upload = () => {
  //     const name = new Date().getTime() + file.name;
  //     const storageRef = ref(storage, name);

  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on('state_changed', 
  //       (snapshot) => {
  //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log('Upload is ' + progress + '% done');
  //         switch (snapshot.state) {
  //           case 'paused':
  //             console.log('Upload is paused');
  //             break;
  //           case 'running':
  //             console.log('Upload is running');
  //             break;
  //         }
  //       }, 
  //       (error) => {
  //       }, 
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setMedia(downloadURL);
  //         });
  //       }
  //     );
  //   };
  //   file && upload();
  // }, [file]);

//   const handleUpdatePost = async () => {
//     try {
//       await upload(); // Call upload function here
  
//       const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           desc,
//           phone,
//           isWhatsapp,
//           location: selectedLocationCategory,
//           category: selectedToolsCategories,
//           img: media, // Assuming you have media state for image
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to update post");
//       }
  
//       // Handle success, for example, redirect to another page
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };
  

//   return (
//     <>
//       <div className='min-h-screen bg-bg text-textColor'>
//         <div className='max-w-screen-xl mx-auto'>
//           <Navbar />
//           <div className='pt-10 text-center mb-10'>
//             <h1 className="text-4xl font-extrabold tracking-normal">Update Post</h1>
//           </div>
//           <form className='max-w-md mx-auto gap-4'>
//             {postData && (
//               <div>
//                 <Label htmlFor="title">Title</Label>
//                 <Input id="title" className="bg-gray-100 mb-3" 
//                   placeholder="Title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <Label htmlFor="title">Description</Label>
//                 <Textarea
//                   id="desc"
//                   className="mb-3 bg-gray-100 w-full h-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//                   placeholder="Description"
//                   value={desc}
//                   onChange={(e) => setDesc(e.target.value)}
//                 />
//                 {/* <Label htmlFor="title">Phone</Label>
//                 <Input
//                   id="phone"
//                   className="bg-gray-100"
//                   placeholder="Phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//                 <div className='flex gap-3'>
//                   <img src="/whatsapp.png" alt='' width={20} height={20} />
//                   <span>Is this a whatsapp Number?</span>
//                   <input
//                     type="radio"
//                     checked={isWhatsapp}
//                     onChange={(e) => setIsWhatsapp(e.target.checked)}
//                   />
//                 </div> */}

//                 {/* <label htmlFor="locationCategory">Select Location Category:</label>
//                 <select
//                   id="locationCategory"
//                   value={selectedLocationCategory}
//                   onChange={(e) => setSelectedLocationCategory(e.target.value)}
//                 >
//                   {locationCategories.map((category) => (
//                     <option key={category.id} value={category.id}>
//                       {category.title}
//                     </option>
//                   ))}
//                 </select> */}






//                 <div className="flex flex-col items-center justify-center">
//                   {/* <label htmlFor="image" className="relative">
//                     <input
//                       type="file"
//                       id="image"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       onDrop={handleDrop}
//                       onDragOver={handleDragOver}
//                       className="hidden"
//                     />
//                     {file ? (
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt="Preview"
//                         className="w-full h-full object-cover rounded-md border-2 border-gray-300"
//                       />
//                     ) : postData && postData.img ? (
//                       <img
//                         src={postData.img}
//                         alt="Current Image"
//                         className="w-full h-full object-cover rounded-md border-2 border-gray-300"
//                       />
//                     ) : (
//                       <div
//                         className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md"
//                         onDrop={handleDrop}
//                         onDragOver={handleDragOver}
//                       >
//                         <div className='column self-center bg-white px-10 py-10' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                           <Image className='mb-6' src={uploadIcon} width={100} height={100} />
//                           <p className="text-gray-400">Drag and drop files here or click to <strong className='text-blue-500 font-bold'>browse</strong></p>
//                         </div>
//                       </div>
//                     )}
//                   </label> */}
//                 </div>


//                 <Button type="submit" className='mt-8 w-full' onClick={handleUpdatePost}>Update Post</Button>
//               </div>
//             )}
//           </form>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Page;











{/* <label>
                  Is WhatsApp:
                  <input
                    type="checkbox"
                    checked={isWhatsapp}
                    onChange={(e) => setIsWhatsapp(e.target.checked)}
                  />
                </label> */}
                {/* Radio button for isWhatsApp:
                <label>
                  Is WhatsApp:
                  <input
                    type="radio"
                    value={true}
                    checked={isWhatsapp === true}
                    onChange={(e) => setIsWhatsapp(true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value={false}
                    checked={isWhatsapp === false}
                    onChange={(e) => setIsWhatsapp(false)}
                  />
                  No
                </label> */}
                //  {file ? (
                //   <img
                //     src={URL.createObjectURL(file)}
                //     alt="Preview"
                //     className="w-full h-full object-cover rounded-md border-2 border-gray-300"
                //   />
                // ) : postData && postData.img ? (
                //   <img
                //     src={postData.img}
                //     alt="Current Image"
                //     className="w-full h-full object-cover rounded-md border-2 border-gray-300"
                //   />
                // ) : (
                //   <div
                //     className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md"
                //     onDrop={handleDrop}
                //     onDragOver={handleDragOver}
                //   >
                //     <div className='column self-center bg-white px-10 py-10' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                //       <Image className='mb-6' src={uploadIcon} width={100} height={100} />
                //       <p className="text-gray-400">Drag and drop files here or click to <strong className='text-blue-500 font-bold'>browse</strong></p>
                //     </div>
                //   </div>
                // )}