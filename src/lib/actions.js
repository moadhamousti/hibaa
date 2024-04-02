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



export const addCategory = async (formData) => {
  const { id,title} = Object.fromEntries(formData);
  console.log(formData)

  try {

    const newCategory = await db.MedCategory.create({
      data: {
        id,
        title,
      },
    });

    console.log("User added successfully:", newCategory); // Log the created user object



    return newCategory; // Optionally return the created user object
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to create user!");
  }
};



export const addLocation = async (formData) => {
  const { id,title} = Object.fromEntries(formData);
  console.log(formData)

  try {

    const newLocation = await db.LocationCategory.create({
      data: {
        id,
        title,
      },
    });

    console.log("User added successfully:", newLocation); // Log the created user object



    return newLocation; // Optionally return the created user object
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to create user!");
  }
};






export const updateUser = async (formData) => {
  const { id, name, username, email, password, role } = Object.fromEntries(formData);
  console.log(formData);

  try {
    const updateFields = {
      name, username, email, password, role
    };

    // Remove empty or undefined fields from updateFields object
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === "" || updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    // Update user document in the database
    const updatedUser = await db.user.update({
      where: { id },
      data: updateFields,
    });

    console.log("User updated successfully:", updatedUser);
    

    return updatedUser; // Return the updated user object
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user!");
  }
};




export const updateCategory = async (formData) => {
  const { id, title } = Object.fromEntries(formData);
  console.log(formData);

  try {
    const updateFields = {
      id, title
    };

    // Remove empty or undefined fields from updateFields object
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === "" || updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    // Update user document in the database
    const updatedCategory = await db.MedCategory.update({
      where: { id },
      data: updateFields,
    });

    console.log("User updated successfully:", updatedCategory);
    

    return updatedCategory; // Return the updated user object
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category!");
  }
};

export const updateLocation = async (formData) => {
  const { id, title } = Object.fromEntries(formData);
  console.log(formData);

  try {
    const updateFields = {
      id, title
    };

    // Remove empty or undefined fields from updateFields object
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === "" || updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    // Update user document in the database
    const updatedLocation = await db.LocationCategory.update({
      where: { id },
      data: updateFields,
    });

    console.log("User updated successfully:", updatedLocation);
    

    return updatedLocation; // Return the updated user object
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category!");
  }
};































export const addPost = async (formData) => {
  const { title, desc, phone, userEmail,location,category,img, type } = Object.fromEntries(formData);
  const isWhatsapp = formData.get('isWhatsapp') === 'true';
  
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
        type,
      },
    });

    console.log("Don Post added successfully:", newDonPost); // Log the created user object



    return newDonPost; // Optionally return the created user object
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to create user!");
  }
};










export const updatePost = async (formData) => {
  const { id, title, desc, phone, userEmail, location, category, img, type } = Object.fromEntries(formData);
  const isWhatsapp = formData.get('isWhatsapp') === 'true';

  
  try {
    const updateFields = {
      title, desc, phone, userEmail, isWhatsapp, location, category, img, type
    };

    // Remove empty or undefined fields from updateFields object
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === "" || updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    // Update ReqPost or DonPost based on the post type
    if (type === 'DONATION') {
      await db.DonPost.update({
        where: { id },
        data: updateFields,
      });
    } else if (type === 'REQUEST') {
      await db.ReqPost.update({
        where: { id },
        data: updateFields,
      });
    } else {
      throw new Error('Invalid post type');
    }
    console.log(id)

    console.log("Post updated successfully");

    return { id, ...updateFields }; // Return the updated post object
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post!");
  }
};










export const deletePost = async (formData) => {
  const { id, postType } = Object.fromEntries(formData);
  console.log("Deleting post with ID:", id, "and type:", postType);

  try {
    if (postType === 'DONATION') { // Assuming DONATION corresponds to DonPost
      // Delete from DonPost
      await db.DonPost.delete({ where: { id } });
    } else if (postType === 'REQUEST') { // Assuming REQUEST corresponds to ReqPost
      // Delete from ReqPost
      await db.ReqPost.delete({ where: { id } });
    } else {
      throw new Error('Invalid post type');
    }

    console.log("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post!");
  }
};








export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  console.log("Deleting user with ID:", id); // Log the ID here

  try {
    // Delete from DonPost
    await db.user.delete({ where: { id } });


    console.log("user deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user!");
  }
};




export const deleteCategory = async (formData) => {
  const { id } = Object.fromEntries(formData);
  console.log("Deleting user with ID:", id); // Log the ID here

  try {
    // Delete from DonPost
    await db.LocationCategory.delete({ where: { id } });


    console.log("user deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user!");
  }
};