import { addCategory } from '@/lib/actions';
import styles from './add.module.css';


const AddCategory = () => {
  return (
    <div className={styles.container}>
      <form action={addCategory} className={styles.form}>
        <input type="text" className='bg-gray-100 mb-3' placeholder="id" name="id" required />
        <input type="text" className='bg-gray-100 mb-3' placeholder="titre" name="title" required />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddCategory;