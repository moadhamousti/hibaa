import React from 'react'
import styles from './singlePostPage.module.css'
import Image from 'next/image'
import { fetchPost, fetchcategories, fetchlocations } from '@/lib/data';
import { updatePost } from '@/lib/actions';


const page = async ({params, searchParams}) => {

    const { id } = params;

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const { locations  } = await fetchlocations(q, page);
    const {categories} = await fetchcategories(q, page);

    console.log(locations)
    console.log(categories)

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
                <label className='mt-5'>Catégorie</label>
                <select name="category" id="category" defaultValue={post.category} required>
                    <option value="">Choisir un Emplacement</option>
                    {categories.map(category => (
                    <option  key={category.id} value={category.title}>{category.title}</option>
                    ))}
                </select>
                <label className='mt-5'>Emplacement</label>

                <select name="location" id="location"  defaultValue={post.location} required>
                    <option value="">Choisir une Catégorie</option>
                    {locations.map(location => (
                    <option key={location.id} value={location.title}>{location.title}</option>
                    ))}
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