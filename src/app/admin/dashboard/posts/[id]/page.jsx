import React from 'react'
import styles from './singlePostPage.module.css'
import Image from 'next/image'
import { fetchPost } from '@/lib/data';
import { updatePost } from '@/lib/actions';


const page = async ({params}) => {

    const { id } = params;

    const post = await fetchPost(id);
    console.log(post);
    console.log(id);



  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
                <Image src={post.img || "https://www.medisave.co.uk/cdn/shop/collections/Tom.jpg?v=1683730716"} alt="" fill/>  
            </div>
        </div>
        <div className={styles.formContainer}>
            <form action={updatePost} className={styles.form} defaultValue={post.type}  >
                <input type="hidden" name="id" value={post.id} />
                {/* <select name="type" id="type" value={post.type}>
                    <option value="DONATION">DONATION</option>
                    <option value="REQUEST">REQUEST</option>
                </select> */}
                <label>Type</label>
                <input className='bg-gray-400' name="type" id="type" value={post.type} placeholder={post.title} required/>
                
                <label>Titre</label>
                <input type="text" name='title' defaultValue={post.title}  placeholder={post.title} required/>
                <label>Description</label>
                <textarea name="desc" id="desc" rows="10" defaultValue={post.desc} placeholder={post.desc} required></textarea>
                <label>Numéros de téléphone</label>
                <input type="text" name='Phone' defaultValue={post.phone}  placeholder={post.phone}/>
                <label>E-mail</label>
                <input type="email" name='userEmail' value={post.userEmail}  placeholder={post.userEmail} required />
                <div className="flex gap-5 items-center">
                    <p>WhatsApp Numero ?</p>
                    <input
                        type="radio"
                        name="isWhatsapp"
                        value={post.isWhatsapp ==='true'}
                    />
                    Oui
                    <input
                        type="radio"
                        name="isWhatsapp"
                        value={post.isWhatsapp ==='false'}
                    />
                    Non
                </div>
                <label className='mt-5'>Location</label>
                <select name="location" id="location" defaultValue={post.location}>
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
                <label>Category</label>
                <select name="category" id="category" defaultValue={post.category}>
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
                <button type='submit'>
                    Modifier
                </button>
            </form>
        </div>
    </div>
  )
}

export default page