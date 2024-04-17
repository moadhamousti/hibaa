import React from 'react';
import styles from "./add.module.css";
import CategoryList from '@/components/CategoriesList';
import LocationList from '@/components/LocationList';
import Image from 'next/image';
import { addForm, addPost } from '@/lib/actions';
import MedToolsTypeFilter from '@/components/MedToolsTypeFilter';
import { fetchloca } from '@/lib/data';

// const defaultImageUrl = "https://www.medisave.co.uk/cdn/shop/collections/Tom.jpg?v=1683730716";

const AddPost = async({ searchParams }) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { locations  } = await fetchloca(q, page);
  
  return(
  <div className={styles.container}>
    <form action={addForm} className={styles.form}>
      <div>
        {/* <Image
          src={defaultImageUrl}
          alt=""
          width={200}
          height={200}
          name="img"
          className="item-center rounded-sm"
        /> */}
        <input id='phaName' type="text" name='phaName' placeholder='Pharmacie Nom' className='bg-gray-100 mb-3' />
        <input id='ownerName' type="text" name='ownerName' placeholder='Propriétaire Nom' className='bg-gray-100 mb-3' />
        <textarea
          required
          name="desc"
          id="desc"
          rows="10"
          className='bg-gray-100 mb-3'
          placeholder="Description"
        ></textarea>
        <input id='phone' type="tel" name='phone' placeholder='Numéro de téléphone' className='bg-gray-100 mb-3'/>
        <select name="location" id="location" className='bg-gray-100 mb-3' required>
            <option value="">Choisir un Emplacement</option>
            {locations.map(location => (
              <option key={location.id} value={location.title}>{location.title}</option>
            ))}
          </select>
        <div className="flex w-1/2 gap-4">
        <p className='w-full'>Est-ce un numéro WhatsApp ?</p>
          <label htmlFor="whatsapp-yes" className="">
            <div className="flex">
              <input 
                  type="radio"
                  id="whatsapp-yes"
                  name="isWhatsapp" // Change to isWhatsapp
                  value="WHATSAPP" 
                  // checked={form.isWhatsapp === "WHATSAPP"} 
                  className='bg-gray-100 mb-3'
                  readOnly
              />
              
              <p className='mt-1'>Oui</p>
            </div>
          </label>
          <label htmlFor="whatsapp-no" className="">
              <div className="flex">
                <input 
                    type="radio"
                    id="whatsapp-no"
                    name="isWhatsapp" // Change to isWhatsapp
                    value="REGULAR" 
                    className='bg-gray-100 mb-3'
                    // checked={form.isWhatsapp === "REGULAR"} 
                    readOnly
                />
                <p className='mt-1'>Non</p>
              </div>
          </label>
        </div>
        <input type="email" name='userEmail' className='bg-gray-100 mb-3' id='userEmail' placeholder="E-mail d'utilisateur" required />
        <input type="text" className='bg-gray-100 mb-3' name='address' id='address' placeholder="Adresse" required />
        <br/>
        <label >Social Links:</label>
        <div className="className='mt-4'">
          <input type="text" name='facebook' className='bg-gray-100 mb-3' id='facebook' placeholder="Facebook"  />
          <input type="text" name='instagram' className='bg-gray-100 mb-3' id='instagram' placeholder="Instagram"  />
          <input type="text" name='twitter' className='bg-gray-100 mb-3' id='twitter' placeholder="Twitter"  />
        </div>
        <input type="text" name='latitude' className='bg-gray-100 mb-3' id='latitude' placeholder="Latitude"  />
        <input type="text" name='longitude' className='bg-gray-100 mb-3' id='longitude' placeholder="Longitude"  />
        <select name="isValidated" id="isValidated" defaultValue="NONVALIDER" className='bg-gray-100 mb-3' required>
    <option value="VALIDER">Valider</option>
    <option value="NONVALIDER">Non Valider</option>
</select>

        






        
      </div>
      <button type='submit'>Ajouter</button>
    </form> 
  </div>
);
}

export default AddPost;
