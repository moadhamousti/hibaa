import React from 'react'
import styles from './singlePostPage.module.css'
import Image from 'next/image'


const page = () => {
  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
                <Image src="https://github.com/shadcn.png" alt="" fill/>  
            </div>
            Jogn Doe
        </div>
        <div className={styles.formContainer}>
            <form action="" className={styles.form}>
                <label>Title</label>
                <input type="text" name='titre' placeholder='john doe' required/>
                <label>Description</label>
                <input type="password" name='description' placeholder='description' required/>
                <label>Phone</label>
                <input type="text" name='Phone' placeholder='Phone'/>
                <input
                    type='radio'
                />
                <select name='loc' id='loc'>
                    <option value="agadir">Agadir</option>
                    <option value="rabat">Rabat</option>
                </select>
                <select name='cat' id='cat'>
                    <option value="crutches">Crutches</option>
                    <option value="wheelchair">Wheelchair</option>
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