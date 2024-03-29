// // pages/admin/users.js
// "use client"
// import React, { useState } from 'react';
// import NavbarAdmin from '@/components/NavbarAdmin';
// import Footer from '@/components/Footer';
// import { useRouter } from 'next/navigation';

// const getUsers = async () => {
//   const res = await fetch("http://localhost:3000/api/admin/users", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Could not load users");
//   }

//   return res.json();
// }

// const updateUserRole = async (id, newRole) => {
//   const res = await fetch(`http://localhost:3000/api/admin/users/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ role: newRole })
//   });

//   if (!res.ok) {
//     throw new Error("Could not update user role");
//   }
// }

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const router = useRouter();

//   useState(() => {
//     getUsers()
//       .then(data => setUsers(data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleEditRole = async (id, newRole) => {
//     try {
//       await updateUserRole(id, newRole);
//       router.reload(); // Refresh the page after updating user role
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <>
//       <NavbarAdmin />
//       <div>
//         <input type='text' className='' placeholder='seearch..'/>
//       </div>
//       <div className='min-h-screen bg-bg text-textColor'>
//         <div className='max-w-screen-xl mx-auto'>
//           <table className='min-w-full divide-y divide-gray-200'>
//             <thead className='bg-gray-50'>
//               <tr>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Created At</th>
//                 <th>Updated At</th>
//                 <th>Role</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody className='bg-white divide-y divide-gray-200'>
//               {users.map(user => (
//                 <tr key={user.id}>
//                   <td>
//                     <img className='w-10 h-10 rounded-full' src={user.image} alt={user.name} />
//                   </td>
//                   <td>{user.name}</td>
//                   <td>{user.username}</td>
//                   <td>{user.email}</td>
//                   <td>{user.createdAt}</td>
//                   <td>{user.updatedAt}</td>
//                   <td>{user.role}</td>
//                   <td>
//                     <button
//                       className="text-indigo-600 hover:text-indigo-900"
//                       onClick={() => handleEditRole(user.id, user.role === 'ADMIN' ? 'USER' : 'ADMIN')}
//                     >
//                       {user.role === 'ADMIN' ? 'Remove Admin' : 'Make Admin'}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default UsersPage;










// pages/admin/users.js
"use client"
import React, { useState, useEffect } from 'react';
import NavbarAdmin from '@/components/NavbarAdmin';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';

const getUsers = async () => {
  const res = await fetch("http://localhost:3000/api/admin/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Could not load users");
  }

  return res.json();
}

const updateUserRole = async (id, newRole) => {
  const res = await fetch(`http://localhost:3000/api/admin/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ role: newRole })
  });

  if (!res.ok) {
    throw new Error("Could not update user role");
  }
}

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

  const handleEditRole = async (id, newRole) => {
    try {
      await updateUserRole(id, newRole);
      router.reload(); // Refresh the page after updating user role
    } catch (error) {
      console.error(error);
    }
  }

  const columns = [
    { field: 'image', headerName: 'Image', width: 100, renderCell: (params) => <img className='w-10 h-10 rounded-full' src={params.row.image} alt={params.row.name} /> },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    { field: 'updatedAt', headerName: 'Updated At', width: 150 },
    { field: 'role', headerName: 'Role', width: 120 },
    { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
      <button
        className="text-indigo-600 hover:text-indigo-900"
        onClick={() => handleEditRole(params.row.id, params.row.role === 'ADMIN' ? 'USER' : 'ADMIN')}
      >
        {params.row.role === 'ADMIN' ? 'Remove Admin' : 'Make Admin'}
      </button>
    )}
  ];

  return (
    <>
      <NavbarAdmin />
      <div className='min-h-screen bg-bg text-textColor'>
        <div className='max-w-screen-xl mx-auto'>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UsersPage;
