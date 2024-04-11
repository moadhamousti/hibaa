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
          <option value="DONATION">Poste Type</option>
          <option value="DONATION">DONATION</option>
          <option value="REQUEST">DEMANDE</option>
        </select>
        <input type="text" name='title' placeholder='Titre' required />
        <input type="email" name='userEmail' placeholder="E-mail d'utilisateur" required />
        <select name="category" id="category" required>
          <option value="">Choose a Category</option>
          <option value="Appareils_orthopediques">Appareils orthopédiques</option>
          <option value="Attelle">Attelle</option>
          <option value="Bequilles">Béquilles</option>
          <option value="Cannes">Cannes</option>
          <option value="Chaises_de_douche_a_roulettes">Chaises de douche à roulettes</option>
          <option value="Chaussures_orthopediques">Chaussures orthopédiques</option>
          <option value="Commodes">Commodes</option>
          <option value="Fauteuils_roulants">Fauteuils roulants</option>
          <option value="Lits_hopitaux">Lits hôpitaux</option>
          <option value="Lunettes">Lunettes</option>
          <option value="Marcheuses">Marcheuses</option>
          <option value="Moniteurs_de_glycemie">Moniteurs de glycémie</option>
          <option value="Nebuliseurs">Nébuliseurs</option>
          <option value="Protheses">Prothèses</option>
          <option value="Protheses_auditives">Prothèses auditives</option>
          <option value="Reservoirs_oxygene">Réservoirs oxygène</option>
          <option value="Stethoscopes">Stéthoscopes</option>
          <option value="Systemes_alerte_medicale">Systèmes alerte médicale</option>
          <option value="Tables_de_nuit">Tables de nuit</option>
          <option value="Tensiometres">Tensiomètres</option>
          <option value="Tubes_alimentation">Tubes alimentation</option>
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
);

export default AddPost;
