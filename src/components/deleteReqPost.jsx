"use client"
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteReqPost = ({ data }) => {
  const router = useRouter(); // Initialize useRouter here

  const onDeleteClick = async () => {
    try {
      const res = await fetch(`/api/posts/reqPost/${data.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.push('/feed'); // Redirect to home page or any other page after deletion
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
        <>
          <DeleteIcon  sx={{ color: '#EF507F' }}onClick={onDeleteClick} /> 

        </>
    </div>
  );
};

export default DeleteReqPost;












// "use client"


// import React, { useState } from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useRouter } from 'next/navigation';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

// const DeleteDonPost = ({ data }) => {
//   const router = useRouter();
//   const [showModal, setShowModal] = useState(false);

//   const onDeleteClick = async () => {
//     try {
//       const res = await fetch(`/api/posts/reqPost/${data.id}`, {
//         method: 'DELETE',
//       });
//       if (res.ok) {
//       } else {
//         throw new Error('Failed to delete post');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };

//   return (
//     <div>
//       {showModal && (
//         <div className="fixed z-10 inset-0 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 transition-opacity">
//               <div className="absolute inset-0 bg-gray-500 opacity-75 blur"></div>
//             </div>
//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="sm:flex sm:items-start">
//                   <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-[#ffd4e2] sm:mx-0 sm:h-10 sm:w-10">
//                     <DeleteIcon className="h-6 w-6 text-[--pink]" aria-hidden="true" />
//                   </div>
//                   <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                     <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
//                       Supprimer Poste
//                     </h3>
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-500">
//                         Es-tu sur de vouloir supprimer cette poste? Cette action ne peut pas être annulée.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//               <button
//                 onClick={() => {
//                   onDeleteClick();
//                   setShowModal(false);
//                   router.push('/feed'); // Add this line to navigate to /feed
//                 }}
//                 type="button"
//                 className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[--pink] text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
//               >
//                 Supprimer
//               </button>

//                 <button
//                   onClick={() => setShowModal(false)}
//                   type="button"
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
//                 >
//                   Annuler
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <DeleteIcon onClick={() => setShowModal(true)} className="h-6 w-6 text-[--pink] cursor-pointer" aria-hidden="true" />
//     </div>
//   );
// };

// export default DeleteDonPost;

