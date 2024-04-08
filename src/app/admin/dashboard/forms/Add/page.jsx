import React from 'react';
import styles from "./add.module.css";
import CategoryList from '@/components/CategoriesList';
import LocationList from '@/components/LocationList';
import Image from 'next/image';
import { addForm, addPost } from '@/lib/actions';
import MedToolsTypeFilter from '@/components/MedToolsTypeFilter';

// const defaultImageUrl = "https://www.medisave.co.uk/cdn/shop/collections/Tom.jpg?v=1683730716";

const AddPost = () => (
  
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
        <input id='phaName' type="text" name='phaName' placeholder='pharmacie Nom' />
        <input id='ownerName' type="text" name='ownerName' placeholder='Propriétaire Nom' />
        <textarea
          required
          name="desc"
          id="desc"
          rows="10"
          placeholder="Description"
        ></textarea>
        <input id='phone' type="tel" name='phone' placeholder='Phone' />
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
        <div className="flex">
            <p>WhatsApp Numero ?</p>
        <label htmlFor="whatsapp-yes" className="ml-2 mb-1">
          <input 
              type="radio"
              id="whatsapp-yes"
              name="isWhatsapp" // Change to isWhatsapp
              value="WHATSAPP" 
              // checked={form.isWhatsapp === "WHATSAPP"} 
              readOnly
          />
          Yes
      </label>
      <label htmlFor="whatsapp-no" className="ml-2 mb-1">
          <input 
              type="radio"
              id="whatsapp-no"
              name="isWhatsapp" // Change to isWhatsapp
              value="REGULAR" 
              // checked={form.isWhatsapp === "REGULAR"} 
              readOnly
          />
          No
      </label>
      </div>
        <input type="email" name='userEmail' id='userEmail' placeholder="E-mail d'utilisateur" required />
        <input type="text" name='address' id='address' placeholder="Adresse" required />
        <br/>
        <label >Social Links:</label>
        <div className="className='mt-4'">
          <input type="text" name='facebook' id='facebook' placeholder="Facebook"  />
          <input type="text" name='instagram' id='instagram' placeholder="Instagram"  />
          <input type="text" name='twitter' id='twitter' placeholder="Twitter"  />
        </div>
        <select name="isValidated" id="isValidated" defaultValue="NONVALIDER">
    <option value="VALIDER">Valider</option>
    <option value="NONVALIDER">Non Valider</option>
</select>

        






        
      </div>
      <button type='submit'>Ajouter</button>
    </form> 
  </div>
);

export default AddPost;
