import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import styles from "./singlePage.module.css";
import Image from 'next/image';
import Link from 'next/link';
import whatsapp from "../../../../public/whatsapp.png"
import gmail from "../../../../public/Gmail.png"
import { formatDistanceToNow } from 'date-fns';


const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};






const page = async ({ params }) => {

  const { id } = params;

  const data = await getData(id);
  const formattedDate = formatDistanceToNow(new Date(data.createdAt), { addSuffix: true });

  const getEmailServiceLink = (email) => {
    const domain = email.split('@')[1];
    switch (domain) {
      case 'gmail.com':
        return 'https://mail.google.com';
      case 'yahoo.com':
        return 'https://mail.yahoo.com';
      case 'hotmail.com':
        return 'https://outlook.live.com';
      default:
        return null;
    }
  };
  const emailServiceLink = getEmailServiceLink(data.user.email);
  return (
    <>
    <Navbar />
      <div className='min-h-screen bg-bg text-textColor'>
        <div className='max-w-screen-xl mx-auto'>
          <div className={styles.container}>
            <div className={styles.infoContainer}>
              <div className={styles.textContainer}>
                <Link href={`/profile/${data.user.id}`}>
                  <h1 className={styles.title}>
                    {data?.title}
                  </h1>
                </Link>
                <div className={styles.user}>
                <Link href={`/profile/${data.user.id}`}>
                  {data?.user?.image ? (
                    <div className={styles.userImageContainer}>
                      <Image src={data.user.image} alt="" fill className={styles.avatar} />
                    </div>
                  ) : (
                    <div className={styles.userImageContainer}>
                      <Image src="https://github.com/shadcn.png" alt="Default Image" fill className={styles.avatar} />
                    </div>
                  )}
                </Link>

                  <div className={styles.userTextContainer}>
                    <span className={styles.username}>
                      {data?.user?.username ? data.user.username : data?.user?.name}
                    </span>
                    <span className={styles.date}>{formattedDate}</span>
                  </div>
                </div>
              </div>
              {data?.Image && (
                <div className={styles.imageContainer}>
                  <Image src={data.img} alt="" fill className={styles.image} />
                </div>
              )}
            </div>
            <div>
            <div className='flex gap-3'>
              {data.isWhatsapp ? (
                <Link href={`https://wa.me/+212${data.phone}`}>
                  <Image
                    src={whatsapp} 
                    alt="WhatsApp"
                    width={20} height={20}
                  />
                </Link>
              ) : (
                <Image
                  src="" 
                  alt="Phone"
                  width={20} height={20}
                />
              )}
              <h3 className=''><Link href={`https://wa.me/+212${data.phone}`}>{data.phone}</Link></h3>

            </div>
              <div className='flex gap-3'>
              {emailServiceLink && (
                <Link href={emailServiceLink} passHref>
                  <button>
                    {data.user.email.includes('@gmail') && (
                      <Image src={gmail} alt="Gmail" width={20} height={20}/>
                    )}
                    {data.user.email.includes('@yahoo') && (
                      <img src="/yahoo-icon.png" alt="Yahoo" width={20} height={20}/>
                    )}
                    {data.user.email.includes('@hotmail') && (
                      <img src="/hotmail-icon.png" alt="Hotmail" width={20} height={20} />
                    )}
                  </button>
                </Link>
              )}
              <h3>
                <Link href={emailServiceLink} passHref>
                  {data.user.email}
                </Link>
              </h3>
            </div>
            </div>
            <div className={styles.content}>
              <div className={styles.post}>
                <div
                  className={styles.description}
                />
                {data.desc}
              </div>
              <div className='flex gap-3'>
                <h2>Views :</h2>
                <h3>{data.views}</h3>
              </div>
            </div>
          </div>
          
        </div>
        <Footer/>
      </div>
    
    </>
  )
}

export default page