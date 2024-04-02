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
                
                <label>Title</label>
                <input type="text" name='title' defaultValue={post.title}  placeholder={post.title} required/>
                <label>Description</label>
                <textarea name="desc" id="desc" rows="10" defaultValue={post.desc} placeholder={post.desc} required></textarea>
                <label>Phone</label>
                <input type="text" name='Phone' defaultValue={post.phone}  placeholder={post.phone}/>
                <label>Email</label>
                <input type="email" name='userEmail' value={post.userEmail}  placeholder={post.userEmail} required />
                <div className="flex gap-5 items-center">
                    <p>WhatsApp Number ?</p>
                    <input type="radio" name="isWhatsapp" value="true"/>
                </div>
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
                <select name="category" id="category" defaultValue={post.category}>
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
                <button type='submit'>
                    Update
                </button>
            </form>
        </div>
    </div>
  )
}

export default page