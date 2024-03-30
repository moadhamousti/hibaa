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
      const res = await fetch(`/api/posts/delete/reqPost/${data.id}`, {
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
