import styles from './singleLocationPage.module.css'; 
import Image from 'next/image'; 
import Link from 'next/link';
import { fetchLocation } from '@/lib/data';
import { updateLocation } from '@/lib/actions';

const SingleLocationPage = async ({ params }) => {
  const { id } = params;

  // Fetch user data directly in the component
  const location = await fetchLocation(id);
  console.log(location);



  return (
    <div className={styles.container}>
                    <div className={styles.infoContainer}>
                      <span>{location.title}</span>
                    </div>
                    <div className={styles.formContainer}>
                        <form action={updateLocation} className={styles.form}>
                            <input name='id' value={location.id} hidden/>
                            <label>Titre</label>
                            <input type="text" name='title' placeholder={location.title}/>
                            <button type='submit'>
                                Modifier
                            </button>
 
                        </form>
                    </div>
    </div>
  )
}

export default SingleLocationPage