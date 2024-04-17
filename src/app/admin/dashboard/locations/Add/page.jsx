import { addLocation } from '@/lib/actions';
import styles from './add.module.css';


const AddCategory = () => {
  return (
    <div className={styles.container}>
      <form action={addLocation} className={styles.form}>
        <input type="text" placeholder="id" name="id" required className='bg-gray-100 mb-3' />
        <input type="text" placeholder="Titre" name="title" required className='bg-gray-100 mb-3' />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddCategory;