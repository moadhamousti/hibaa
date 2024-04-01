"use server"


import { db } from './db';
import bcryptjs from "bcryptjs";

export const addUser = async (formData) => {
  const { name, username, email, password, role } = Object.fromEntries(formData);
  console.log(formData)

  try {
    const salt = await bcryptjs.genSalt(10);
    console.log("Salt generated:", salt); // Log the generated salt
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log("Password hashed:", hashedPassword); // Log the hashed password

    const newUser = await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role,
      },
    });

    console.log("User added successfully:", newUser); // Log the created user object



    return newUser; // Optionally return the created user object
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to create user!");
  }
};




export const addPostDonate = async (formData) => {
  const { title, desc, phone, userEmail,isWhatsapp,location,category,img } = Object.fromEntries(formData);
  console.log(formData)

  try {

    const newDonPost = await db.DonPost.create({
      data: {
        title, 
        desc, 
        phone, 
        userEmail,
        isWhatsapp,
        location,
        category,
        img,
      },
    });

    console.log("Don Post added successfully:", newDonPost); // Log the created user object



    return newDonPost; // Optionally return the created user object
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to create user!");
  }
};
