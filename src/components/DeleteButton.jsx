"use client"
import React from 'react';
import Image from 'next/image';
import deleteIcon from "../../public/Gmail.png";

const DeleteButton = ({ id }) => { // Accept id as a prop
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`https://hibaatae.vercel.app/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Handle successful deletion
        // For example, redirect to a different page
      } else {
        const errorMessage = await response.text(); // Extract error message from response
        throw new Error(`Failed to delete post: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <button className='' onClick={handleDeleteClick}>
      <Image src={deleteIcon} alt="Delete" width={20} height={20} />
      delete
    </button>
  );
};

export default DeleteButton;
