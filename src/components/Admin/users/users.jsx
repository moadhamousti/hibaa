"use client"

import { Badge } from '@/components/ui/badge';

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';

const dateFormat = 'yyyy-MM-dd HH:mm:ss';

const getUsers = async () => {
  const res = await fetch("http://localhost:3000/api/admin/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Could not load users");
  }

  return res.json();
}

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

  const columns = [
    { field: 'image', headerName: 'Image', width: 100, renderCell: (params) => <img className='w-10 h-10 rounded-full' src={params.row.image} alt={params.row.name} /> },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'postCount', headerName: 'Post Count', width: 120 },
    { field: 'createdAt', headerName: 'Created At', width: 150, renderCell: (params) => (
        <span>{format(new Date(params.row.createdAt), dateFormat)}</span>
      )},
    { field: 'updatedAt', headerName: 'Updated At', width: 150, renderCell: (params) => (
        <span>{format(new Date(params.row.updatedAt), dateFormat)}</span>
      )},
    { field: 'role', headerName: 'Role', width: 120 , renderCell: (params) => (
        <Badge
            variant="light" className={params.row.role === 'ADMIN' ? 'bg-[#c1bc31]' : 'bg-[#3b83c6]'} // Change role to params.row.role
        >
          {params.row.role} {/* Display role value */}
        </Badge>
    )}
  ];

  return (
    <div className="bg-gray-200 rounded-md p-4">
      <div className="max-w-screen-xl">
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Users;


