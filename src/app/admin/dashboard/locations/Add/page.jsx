import { addLocation } from '@/lib/actions';
import styles from './add.module.css';


const AddCategory = () => {
  return (
    <div className={styles.container}>
      <form action={addLocation} className={styles.form}>
        <input type="text" placeholder="id" name="id" required />
        <input type="text" placeholder="title" name="title" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCategory;