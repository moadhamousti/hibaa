// "use client"

// import { useSession } from 'next-auth/react';
// import React, { useState, useEffect } from 'react';
// import { app } from '@/lib/firebase';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// const ProfileForm = () => {
//   const [newName, setNewName] = useState('');
//   const [newUserName, setNewUserName] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const [newImage, setNewImage] = useState('');
//   const [imagePreview, setImagePreview] = useState('');
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [media, setMedia] = useState('');

//   const { data: session } = useSession();
//   const storage = getStorage(app);

//   const handleUpdateProfile = async () => {
//     try {
//       const response = await fetch("/api/user", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id: session.user.id, // Include user ID for updating
//           name: newName,
//           username: newUserName,
//           email: newEmail,
//           image: media, // Use the updated image URL
//         }),
//       });

//       if (response.ok) {
//         console.log("User updated successfully");
//         // You can add further logic here, like displaying a success message
//       } else {
//         console.error("An error occurred while updating user");
//         // You can handle the error here, like displaying an error message
//       }
//     } catch (error) {
//       console.error("Something went wrong:", error);
//     }
//   };

//   useEffect(() => {
//     if (session) {
//       setNewName(session.user.name);
//       setNewUserName(session.user.username);
//       setNewEmail(session.user.email);
//       // setImagePreview(session.user.image);
//     }
//   }, [session]);

  

//   useEffect(() => {
//     const upload = async () => {
//       if (!file) return; // Exit if no file selected

//       setLoading(true); // Start loading
//       const name = new Date().getTime() + file.name;
//       const storageRef = ref(storage, name);

//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//           }
//         },
//         (error) => {
//           setLoading(false); // Stop loading on error
//           console.error("Error uploading file:", error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref)
//             .then((downloadURL) => {
//               setMedia(downloadURL); // Set the media state with the download URL
//               setLoading(false); // Stop loading on upload complete
//             })
//             .catch((error) => {
//               setLoading(false); // Stop loading if URL retrieval fails
//               console.error("Error getting download URL:", error);
//             });
//         }
//       );
//     };
//     upload();
//   }, [file, storage]);

//   return (
//     <div className="min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
//       <section className="p-4 shadow">
//         <div className="flex items-center space-x-4">
//           <label htmlFor="profile-image" className="cursor-pointer">
//             <img src={imagePreview || session?.user.image} alt="Profile" className="w-20 h-20 rounded-full" />
//             <input id="profile-image" type="file" accept="image/*" className="hidden" />
//           </label>
//           <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
//           <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
//           <input type="email" value={newEmail} readOnly />
//           <button onClick={handleUpdateProfile}>Update</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ProfileForm;



"use client"

import { app } from '@/lib/firebase';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loader from '../Loader';
import loader from '../../../public/loader.gif'
import Image from 'next/image';



const ProfileForm = () => {
  const { data: session,update ,status} = useSession();
  const [newName, setNewName] = useState(session?.user?.name || '');
  const [newUserName, setNewUserName] = useState(session?.user?.username || '');
  const [newEmail, setNewEmail] = useState(session?.user?.email || '');
  const [newPassword, setNewPassword] = useState(session?.user?.password || '');

  // const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [loading, setLoading] = useState(false);


  const storage = getStorage(app);

  const [imagePreview, setImagePreview] = useState(session?.user?.image || 'https://github.com/shadcn.png');


  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session.user.id, // Include user ID for updating
          name: newName,
          username: newUserName,
          email: newEmail,
          image: media,
          password:newPassword
        }),
      });
  
      if (response.ok) {
        console.log("User updated successfully");
        // You can add further logic here, like displaying a success message
      } else {
        console.error("An error occurred while updating user");
        // You can handle the error here, like displaying an error message
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  useEffect(() => {
    const upload = async () => {
      setLoading(true); 
      if (!file) {
        setLoading(false);
        return; // Exit if no file selected
      }

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
          console.error("Error uploading file:", error);
          setLoading(false); // Stop loading on error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setMedia(downloadURL); // Set the media state with the download URL
              console.log(downloadURL)
              setLoading(false); // Stop loading on error
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        }
      );
    };
    upload();
  }, [file, storage]);

  const onChange = (e) => {
    const reader = new FileReader();
  
    reader.onload = () => {
      if (reader.readyState === 2) {
        const preview = reader.result;
        setImagePreview(preview);
        // Save image preview to localStorage
        localStorage.setItem('imagePreview', preview);
      }
    };
  
    setFile(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImagePreview(""); // Clear image preview
    onChange(e);
  };

  if (status === "loading") {
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={loader} height={50} width={45} alt="" />
      </div>
    );
  }

  return (
    <div className=" min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
        <section className=" p-4 shadow">
          <div className="md:flex">
            <h2 className="md:w-1/3 sm:text-start text-center uppercase  text-sm font-bold sm:text-lg  mb-16">Personal Information de <span className='text-[--darkishBlue]'>{session?.user.username || session?.user.name}</span> </h2>
          </div>
          <div className=' p-2  grid sm:grid-cols-2  gap-0"  '>
            <div className='  flex flex-col items-center  w-full '>
              <div className='mb-8'>
                <img src="userProfile.svg" alt="" />
              </div>
        <div className="">
          <div className=" text-xl font-normal py-2 px-4 rounded-2xl text-[--bg]   justify-center   mb-8   w-fit mx-auto cursor-pointer relative">
          {loading && (
            <div className="w-full h-full flex items-center justify-center">
              <Loader /> {/* Replace Loader with your loader component */}
            </div>
          )}
            <>
            {imagePreview && (
              <img
                className="w-[150px] h-[150px] items-center rounded-full mb-4"
                // src={session?.user.image}
                value={imagePreview}
                alt="Profile"
                src={session?.user.image}
              />
            )}
            </>
          
            <label htmlFor='image' className="block mt-2 px-4 py-2 bg-[--darkishBlue] rounded-[20px] cursor-pointer text-center">
            Choisir une image
            <input 
              type='file' 
              id='image' 
              // onChange={e => setFile(e.target.files[0])}
              onChange={handleFileChange}
              style={{ display: "none" }}
              className='hidden'
            />
            </label>
          </div>
        </div>
        </div>
        <div className=' mt-[80px]   w-full  '>
          <div className="md:flex mb-8  flex flex-col justify-center sm:w-4/5 w-full ">
            <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
              <div className="mb-4">
                <label className="block uppercase tracking-wide text-xs font-bold">Nom et prénom</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder={session?.user?.name || ''} 
                    value={newName} onChange={(e) => setNewName(e.target.value)} 
                    className="w-full bg-[#F6F7F8] rounded-xl p-2 border outline-none mx-1"
                  />
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-0">
                  <div className="mb-4">
                    <label className="block uppercase tracking-wide text-xs font-bold">Nom d'utilisateur</label>
                      <input 
                        type="text" 
                        placeholder={session?.user?.username || ''} 
                        id="username"
                        value={newUserName} onChange={(e) => setNewUserName(e.target.value)} 
                        className="w-full bg-[#F6F7F8] rounded-xl p-2 border outline-none mx-1"
                      />
                </div>
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-0">
                  <div className="mb-4">
                    <label className="block uppercase tracking-wide text-xs font-bold">E-mail</label>   
                      <input 
                        type="email" 
                        id="email"
                        placeholder={session?.user?.email || ''} 
                        // value={newEmail} 
                        value={newEmail} onChange={(e) => setNewEmail(e.target.value)} 
                        // readOnly 
                        className="w-full bg-[#F6F7F8] rounded-xl p-2 border outline-none mx-1"
                      />
                  </div>
                </div>
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-0">
                  <div className="mb-4">
                    <label className="block uppercase tracking-wide text-xs font-bold">Mot de passe</label>   
                      <input 
                        type="password" 
                        id="password"
                        placeholder='Password' 
                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} 
                        className="w-full bg-[#F6F7F8] rounded-xl p-2 border outline-none mx-1"
                      />
                  </div>
                </div>
          <button  className=" bg-[--darkishBlue] text-xl font-normal py-2 px-4 rounded-[20px] text-white  flex sm:mx-0 mx-auto  mb-6   w-fit cursor-pointer relative" onClick={() => {
            update({ username: newUserName, name: newName, email: newEmail, image: media });
            handleUpdateProfile();
             
          }}>
            Update Profile
          </button>
          </div>
              </div>
          </div>
          
          </div>
          </div>

      </section>
    </div>
  );
};

export default ProfileForm;
