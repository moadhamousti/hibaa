import styles from './singleCategoryPage.module.css'; 
import Image from 'next/image'; 
import Link from 'next/link';
import { fetchCategory } from '@/lib/data';
import { updateCategory } from '@/lib/actions';

const SingleCategoryPage = async ({ params }) => {
  const { id } = params;

  // Fetch user data directly in the component
  const category = await fetchCategory(id);
  console.log(category);



  return (
    <div className={styles.container}>
                    <div className={styles.infoContainer}>
                      <span>{category.title}</span>
                    </div>
                    <div className={styles.formContainer}>
                        <form action={updateCategory} className={styles.form}>
                            <input name='id' value={category.id} hidden/>
                            <label>Title</label>
                            <input type="text" name='title' placeholder={category.title}/>
                            <button type='submit'>
                                Update
                            </button>
 
                        </form>
                    </div>
    </div>
  )
}

export default SingleCategoryPage