import React from 'react';
import styles from "./add.module.css";
import CategoryList from '@/components/CategoriesList';
import LocationList from '@/components/LocationList';
import Image from 'next/image';
import { addPost } from '@/lib/actions';
import MedToolsTypeFilter from '@/components/MedToolsTypeFilter';
import { fetchcat, fetchloca } from '@/lib/data';


const AddPost = async({ searchParams }) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { locations  } = await fetchloca(q, page);
  const {categories} = await fetchcat(q, page);

  console.log(locations)
  console.log(categories)

  return (
  <div className={styles.container}>
    <form action={addPost} className={styles.form}>
      <div>

        <select name="type" id="type" placeholder="Post Type" className='bg-gray-100 mb-3'>
          <option value="DONATION">DONATION</option>
          <option value="REQUEST">DEMANDE</option>
        </select>
        <input type="text" name='title' placeholder='Titre' required className='bg-gray-100 mb-3'/>
        <input type="email" name='userEmail' placeholder="E-mail d'utilisateur" required className='bg-gray-100 mb-3'/>
        {/* <form action={fetchCategories}></form> */}
        <select name="location" id="location" className='bg-gray-100 mb-3' required>
            <option value="">Choisir une Catégorie</option>
            {locations.map(location => (
              <option key={location.id} value={location.title}>{location.title}</option>
            ))}
          </select>
          <select name="category" id="category" className='bg-gray-100 mb-3' required>
            <option value="">Choisir un Emplacement</option>
            {categories.map(category => (
              <option key={category.id} value={category.title}>{category.title}</option>
            ))}
          </select>


          
        <input type="tel" name='phone' placeholder='Phone' className='bg-gray-100 mb-3'/>
        <div className="flex w-1/2 gap-4">
            <p className='w-full'>Est-ce un numéro WhatsApp ?</p>
            <div className="flex">
              <input type="radio" name="isWhatsapp" value="true" className=''/> 
              <p className='mt-1'>Oui</p>
            </div>
            <br/>
            <div className="flex">
              <input type="radio" name="isWhatsapp" value="false" className=''/>
              <p className='mt-1'>Non</p>
            </div>
        </div>
        <textarea
          required
          name="desc"
          id="desc"
          rows="10"
          placeholder="Description"
          className='bg-gray-100 mb-3'
        ></textarea>
      </div>
      <button type='submit'>Ajouter</button>
    </form> 
  </div>
  )
};

export default AddPost;
