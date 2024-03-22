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



const storage = getStorage(app);

const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Page = ({ params }) => {
  const { id } = params;
  const [postData, setPostData] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [phone, setPhone] = useState('');
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [selectedLocationCategory, setSelectedLocationCategory] = useState('');
  const [media, setMedia] = useState('');
  const [file, setFile] = useState(null);
  const [locationCategories, setLocationCategories] = useState([]);
  const [toolsCategories, setToolsCategories] = useState([]);

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

  const handleUpdatePost = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
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

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      // Handle success, for example, redirect to another page
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <PageLayout>
     <Navbar />
      <div className='min-h-screen bg-bg text-textColor'>
          <div className='pt-10 text-center mb-10'>
            <h1 className="text-4xl font-extrabold tracking-normal">Update Post</h1>
          </div>
          <div className='max-w-md mx-auto'>
            {postData && (
              <form className='max-w-md mx-auto gap-4'>
                <Label htmlFor="title">Title</Label>
                <Input id="title" className="bg-gray-200 mb-3" 
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Label htmlFor="title">Description</Label>
                <Textarea
                  id="desc"
                  className="mb-3 bg-gray-200 w-full h-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />

              <div className='mt-3'>
                <Label htmlFor="locationCategory">Select Location:</Label>
                  <select
                    id="locationCategory"
                    value={selectedLocationCategory}
                    className='w-full border-blue-400 bg-gray-200'

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
                </div>
                <div className='mt-3'>
                <Label htmlFor="toolsCategory">Select Category:</Label>
                <select 
                  id="toolsCategory"
                  className='w-full border-blue-400 bg-gray-200'
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
                </div>

                <div className="mt-3">
                <Label htmlFor="title">Description</Label>
                <Input
                  id="phone"
                  className="bg-gray-200"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className='flex gap-3'>
                   <img src="/whatsapp.png" alt='' width={20} height={20} />
                   <span>Is this a whatsapp Number?</span>
                   <input
                    type="checkbox"
                    checked={isWhatsapp}
                    onChange={(e) => setIsWhatsapp(e.target.checked)}
                  />
                </div>
                </div>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="block w-full p-4 border border-gray-300 rounded"
                />

                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md border-2 border-gray-300"
                  />
                ) : postData && postData.img ? (
                  <img
                    src={postData.img}
                    alt="Current Image"
                    className="w-full h-full object-cover rounded-md border-2 border-gray-300"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <p>Drop image here or click to upload</p>
                  </div>
                )}
 

               
                <div className='mt-8 grid gap-9'>
                  <Button onClick={handleUpdatePost}>Update Post</Button>
                </div>
              </form>
            )}
        </div>
        <Footer />
      </div>
      
    </PageLayout>
  );
};

export default Page;















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
//                 <Input id="title" className="bg-gray-200 mb-3" 
//                   placeholder="Title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <Label htmlFor="title">Description</Label>
//                 <Textarea
//                   id="desc"
//                   className="mb-3 bg-gray-200 w-full h-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//                   placeholder="Description"
//                   value={desc}
//                   onChange={(e) => setDesc(e.target.value)}
//                 />
//                 {/* <Label htmlFor="title">Phone</Label>
//                 <Input
//                   id="phone"
//                   className="bg-gray-200"
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