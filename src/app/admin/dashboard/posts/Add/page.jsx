import React from 'react';
import styles from "./add.module.css";
import CategoryList from '@/components/CategoriesList';
import LocationList from '@/components/LocationList';
import Image from 'next/image';
import { addPost } from '@/lib/actions';
import MedToolsTypeFilter from '@/components/MedToolsTypeFilter';
import { fetchcategories, fetchlocations } from '@/lib/data';


const AddPost = async({ searchParams }) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { locations  } = await fetchlocations(q, page);
  const {categories} = await fetchcategories(q, page);

  console.log(locations)
  console.log(categories)

  return (
  <div className={styles.container}>
    <form action={addPost} className={styles.form}>
      <div>

        <select name="type" id="type">
          <option value="DONATION">Poste Type</option>
          <option value="DONATION">DONATION</option>
          <option value="REQUEST">DEMANDE</option>
        </select>
        <input type="text" name='title' placeholder='Titre' required />
        <input type="email" name='userEmail' placeholder="E-mail d'utilisateur" required />
        {/* <form action={fetchCategories}></form> */}
        <select name="location" id="location" required>
            <option value="">Choisir une Catégorie</option>
            {locations.map(location => (
              <option key={location.id} value={location.title}>{location.title}</option>
            ))}
          </select>
          <select name="category" id="category" required>
            <option value="">Choisir un Emplacement</option>
            {categories.map(category => (
              <option key={category.id} value={category.title}>{category.title}</option>
            ))}
          </select>


          
        <input type="tel" name='phone' placeholder='Phone' />
        <div className="">
            <p>WhatsApp Numero ?</p>
            <input type="radio" name="isWhatsapp" value="true" /> Oui
            <br/>
            <input type="radio" name="isWhatsapp" value="false" /> Non
        </div>
        <textarea
          required
          name="desc"
          id="desc"
          rows="10"
          placeholder="Description"
        ></textarea>
      </div>
      <button type='submit'>Ajouter</button>
    </form> 
  </div>
  )
};

export default AddPost;
