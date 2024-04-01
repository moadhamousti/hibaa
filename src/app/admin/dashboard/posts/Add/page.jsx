// import React from 'react';
// import styles from "./add.module.css";
// import CategoryList from '@/components/CategoriesList';
// import LocationList from '@/components/LocationList';
// import { addPostDonate } from '@/lib/actions';
// import Image from 'next/image';

// const defaultImageUrl = "https://github.com/shadcn.png";

// const AddPost = () => (
//   <div className={styles.container}>
//     <form action={addPostDonate} className={styles.form}>
//       <div>
//         <Image
//           src={defaultImageUrl}
//           alt=""
//           width={50}
//           height={50}
//           name="img"
//           className=""
//         />
//         <input type="text" name='title' placeholder='Titre' required />
//         <textarea
//           required
//           name="desc"
//           id="desc"
//           rows="16"
//           placeholder="Description"
//         ></textarea>
//         <input type="tel" name='phone' placeholder='Phone' />
//         <input type="radio" name="isWhatsapp" value="true" />
//         <input type="email" name='userEmail' placeholder='User Email' required />
//         <select name="category" id="category">
//           <option value="Agadir">Choose a Category</option>
//           <option value="BedsideTables">Bedside Tables</option>
//           <option value="Canes">Canes</option>
//           <option value="Commodes">Commodes</option>
//         </select>
//         <select name="location" id="location">
//           <option value="general">Choose a Location</option>
//           <option value="Berkane">Berkane</option>
//           <option value="Berrechid">Berrechid</option>
//           <option value="Casablanca">Casablanca</option>
//         </select>
//       </div>
//       <button type='submit'>Submit</button>
//     </form> 
//   </div>
// );

// export default AddPost;
