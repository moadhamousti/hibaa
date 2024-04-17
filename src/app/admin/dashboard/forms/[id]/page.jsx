import React from 'react'
import styles from './singleFormPage.module.css'
import Image from 'next/image'
import { fetchForm, fetchPost } from '@/lib/data';
import { updateForm, updatePost } from '@/lib/actions';


const page = async ({params}) => {

    const { id } = params;

    const form = await fetchForm(id);
    console.log(form);
    console.log(id);


    const isValidated = form.isValidated


  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
                <Image src={form.img} alt="" fill/>  
            </div>
        </div>
        <div className={styles.formContainer}>
            <form action={updateForm} className={styles.form} defaultValue={form.type}  >
                <input type="hidden" name="id" value={form.id} />
                <label>Nom Pharmacie</label>
                <input name="phaName" id="phaName" defaultValue={form.phaName} placeholder={form.phaName} required/>
                <label>Propriétaire</label>
                <input name="ownerName" id="ownerName" defaultValue={form.ownerName} placeholder={form.ownerName} required/>
                <label>Adresse</label>
                <input type="text" name='address' defaultValue={form.address}  placeholder={form.address} required/>
                <label>Description</label>
                <textarea name="desc" id="desc" rows="10" defaultValue={form.desc} placeholder={form.desc} required></textarea>
                <label>Numéro de téléphone</label>
                <input type="text" name='phone' defaultValue={form.phone}  placeholder={form.phone}/>
                <div className='flex gap-3'>
                    <span className='text-[16px]'>Est-ce un numéro WhatsApp ?</span>
                    <label htmlFor="whatsapp-yes" className="ml-2 mb-1">
                        <div className="flex gap-1">
                            <input 
                                type="radio"
                                id="whatsapp-yes"
                                name="isWhatsapp" // Change to isWhatsapp
                                value="WHATSAPP" 
                                // checked={form.isWhatsapp === "WHATSAPP"} 
                                readOnly
                            />
                            <p className='mt-2'>Oui</p>
                        </div>
                    </label>
                    <label htmlFor="whatsapp-no" className="ml-2 mb-1">
                        <div className="flex gap-1">
                            <input 
                                type="radio"
                                id="whatsapp-no"
                                name="isWhatsapp" // Change to isWhatsapp
                                value="REGULAR" 
                                // checked={form.isWhatsapp === "REGULAR"} 
                                readOnly
                            />
                            <p className='mt-2'>Non</p>
                        </div>
                    </label>
                </div>
                <label>E-mail</label>
                <input  className='bg-gray-100 mb-3' type="email" name='userEmail' value={form.userEmail}  placeholder={form.userEmail} required />
                <label>Facebook Lien</label>
                <input  className='bg-gray-100 mb-3' type="facebook" name='facebook' defaultValue={form.facebook}  placeholder={form.facebook} />
                <label>Instagram Lien</label>
                <input  className='bg-gray-100 mb-3' type="instagram" name='instagram' defaultValue={form.instagram}  placeholder={form.facebook} />
                <label>Twitter Lien</label>
                <input  className='bg-gray-100 mb-3' type="twitter" name='twitter' defaultValue={form.twitter}  placeholder={form.facebook} />
                {/* <div className="flex gap-5 items-center">
                    <p>WhatsApp Number ?</p>
                    <input type="radio" name="isWhatsapp" id="isWhatsapp" placeholder={form.isWhatsapp} value={form.isWhatsapp}/>
                </div> */}
                

                
                {/* <select name="type" id="isValidated">
                    <option value="true" selected={isValidated}>Valider</option>
                    <option value="false" selected={!isValidated}>Non Valider</option>
                </select> */}
                <label>Status</label>
                <select  className='bg-gray-100 mb-3' name='isValidated' id='isValidated' defaultValue={form.isValidated}>
                    <option value="VALIDER" selected={form.isValidated ==="VALIDER"} >Valider</option>
                    <option value="NONVALIDER" selected={!form.isValidated ==="NONVALIDER"}>Non valider</option>
                </select>
                <label>Latitude</label>
                <input  className='bg-gray-100 mb-3' type="latitude" name='latitude' value={form.latitude}  placeholder={form.latitude} />
                <label>Longitude</label>
                <input  className='bg-gray-100 mb-3' type="longitude" name='longitude' value={form.longitude}  placeholder={form.longitude} />



                <button type='submit'>
                    Modifier
                </button>
            </form>
        </div>
    </div>
  )
}

export default page