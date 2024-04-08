// import React from 'react';
// import styles from './add.module.css';
// import { addUser } from '@/lib/actions';

// const AddUser = () => {
//   console.log(addUser)
//   return (
//     <div className={styles.container}>
//       <form onSubmit={addUser} className={styles.form}>
//         <input type="text" name="name" placeholder="Name" required />
//         <input type="text" name="username" placeholder="Username" />
//         <input type="email" name="email" placeholder="Email" /> {/* Add email input */}
//         <input type="password" name="password" placeholder="Password" />
//         <select name="role" id="role">
//           <option value="">Select role</option>
//           <option value="true">Yes</option>
//           <option value="false">No</option>
//         </select>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddUser;


import { addUser } from '@/lib/actions';
import styles from './add.module.css';


const AddUser = () => {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <input type="text" placeholder="Nom" name="name" required />
        <input type="text" placeholder="Nom d'utilisateur" name="username" required />
        <input type="email" placeholder="E-mail" name="email" required />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          required
        />
        <select name="role" id="role">
          <option value="USER">
            Rôle
          </option>
          <option value="ADMIN">Administrateur</option>
          <option value="USER">Utilisateur</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddUser;