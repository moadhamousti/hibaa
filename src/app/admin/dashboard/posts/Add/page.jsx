import React from 'react';
import styles from "./add.module.css";
import CategoryList from '@/components/CategoriesList';
import LocationList from '@/components/LocationList';
import Image from 'next/image';
import { addPost } from '@/lib/actions';
import MedToolsTypeFilter from '@/components/MedToolsTypeFilter';

// const defaultImageUrl = "https://www.medisave.co.uk/cdn/shop/collections/Tom.jpg?v=1683730716";

const AddPost = () => (
  
  <div className={styles.container}>
    <form action={addPost} className={styles.form}>
      <div>
        {/* <Image
          src={defaultImageUrl}
          alt=""
          width={200}
          height={200}
          name="img"
          className="item-center rounded-sm"
        /> */}
        <select name="type" id="type">
          <option value="DONATION">Post Type</option>
          <option value="DONATION">DONATION</option>
          <option value="REQUEST">REQUEST</option>
        </select>
        <input type="text" name='title' placeholder='Titre' required />
        <input type="email" name='userEmail' placeholder='User Email' required />
        <select name="category" id="category" required>
          <option value="">Choose a Category</option>
          <option value="Bedside Tables">Bedside Tables</option>
          <option value="Blood Glucose Monitors">Blood Glucose Monitors</option>
          <option value="Blood Pressure Monitors">Blood Pressure Monitors</option>
          <option value="Canes">Canes</option>
          <option value="Commodes">Commodes</option>
          <option value="Crutches">Crutches</option>
          <option value="Eyeglasses">Eyeglasses</option>
          <option value="Feeding Tubes">Feeding Tubes</option>
          <option value="Hearing Aids">Hearing Aids</option>
          <option value="Hospital Beds">Hospital Beds</option>
          <option value="Medical Alert Systems">Medical Alert Systems</option>
          <option value="Nebulizers">Nebulizers</option>
          <option value="Orthopedic Braces">Orthopedic Braces</option>
          <option value="Orthopedic Shoes">Orthopedic Shoes</option>
          <option value="Oxygen Tanks">Oxygen Tanks</option>
          <option value="Prosthetic Limbs">Prosthetic Limbs</option>
          <option value="Stethoscopes">Stethoscopes</option>
          <option value="Walkers">Walkers</option>
          <option value="Wheelchairs">Wheelchairs</option>
          <option value="Wheeled Shower Chairs">Wheeled Shower Chairs</option>
        </select>
        <select name="location" id="location" required>
          <option value="">Choose a Location</option>
          <option value="Agadir">Agadir</option>
          <option value="Beni Mellal">Beni Mellal</option>
          <option value="Berkane">Berkane</option>
          <option value="Berrechid">Berrechid</option>
          <option value="Casablanca">Casablanca</option>
          <option value="El Jadida">El Jadida</option>
          <option value="Errachidia">Errachidia</option>
          <option value="Fes">Fes</option>
          <option value="Guelmim">Guelmim</option>
          <option value="Kenitra">Kenitra</option>
          <option value="Khemisset">Khemisset</option>
          <option value="Khenifra">Khenifra</option>
          <option value="Khouribga">Khouribga</option>
          <option value="Ksar El Kebir">Ksar El Kebir</option>
          <option value="Larache">Larache</option>
          <option value="Marrakech">Marrakech</option>
          <option value="Meknes">Meknes</option>
          <option value="Mohammedia">Mohammedia</option>
          <option value="Nador">Nador</option>
          <option value="Ouarzazate">Ouarzazate</option>
          <option value="Oujda">Oujda</option>
          <option value="Rabat">Rabat</option>
          <option value="Safi">Safi</option>
          <option value="Sale">Sale</option>
          <option value="Settat">Settat</option>
          <option value="Tangier">Tangier</option>
          <option value="Taourirt">Taourirt</option>
          <option value="Taroudant">Taroudant</option>
          <option value="Taza">Taza</option>
          <option value="Tetouan">Tetouan</option>


          
        </select>
        <input type="tel" name='phone' placeholder='Phone' />
        <div className="flex">
            <p>WhatsApp Number ?</p>
            <input type="radio" name="isWhatsapp" value="true" />
        </div>
        <textarea
          required
          name="desc"
          id="desc"
          rows="10"
          placeholder="Description"
        ></textarea>
      </div>
      <button type='submit'>Submit</button>
    </form> 
  </div>
);

export default AddPost;
