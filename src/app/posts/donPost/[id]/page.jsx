import Footer from '@/components/Footer';
// import Navbar from '@/components/Navbar';
import React from 'react';
import styles from "./singlePage.module.css";
import Image from 'next/image';
import Link from 'next/link';
import whatsapp from "../../../../../public/whatsapp.png";
import gmail from "../../../../../public/Gmail.png";
import hotmail from "../../../../../public/hotmail.png";
import yahoo from "../../../../../public/yahoo.png";
import email from "../../../../../public/email.png";
import phone from "../../../../../public/phone.png";
import EditIcon from '@mui/icons-material/Edit';
import defaultImage from '../../../../../public/equipement.jpg'
import { Badge } from "@/components/ui/badge"

import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import NavbarNoMenu from '@/components/NavbarNoMenu';
import NavbarSimple from '@/components/NavbarSimple';

import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteDonPost from '@/components/deleteDonPost';
import DeleteReqPost from '@/components/deleteReqPost';
import DonRelatedPosts from '@/components/DonRelatedPosts';
import FormRelated from '@/components/FormRelated';



const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/posts/donPost/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};


const getRandomComponent = () => {
  const randomNumber = Math.random();
  const threshold = 0.5;

  if (randomNumber > threshold) {
    return <DonRelatedPosts />;
  } else {
    return <FormRelated />;
  }
};




const Page = async ({ params }) => {

  const { id } = params;
  const data = await getData(id);
  
 
  

  const session = await getServerSession(authOptions);

  const isCurrentUser = session && session.user && data.user && session.user.email === data.user.email;
  console.log("isCurrentUser", isCurrentUser);
  
  const profileLink = isCurrentUser ? (session ? '/profile': '') : (data.user ? `/profile/user/${data.user.id}` : '');
  console.log("profileLink", profileLink);

  const formattedDate = data.createdAt ? 
  formatDistanceToNowStrict(new Date(data.createdAt), { addSuffix: true }) : 
  'Unknown';

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
      <div className='min-h-screen bg-bg text-textColor'>
        <div className='max-w-screen-xl mx-auto'>
          <NavbarSimple />
          <div className='py-6 px-1 shadow-lg'>
            <h1 className="text-4xl text-[black] sm:font-bold fsm:my-4 capitalize text-center sm:text-left">Détails poste</h1>
            <div className="sm:flex justify-between">
              <div className="mt-10 bg-[white] h-[450px] w-full rounded overflow-hidden max-w-xl sm:w-full">
                <Image width={100} height={100} src={data.img ? data.img : defaultImage} alt="Mountain" className="w-full h-full sm:object-cover object-fill" />
              </div>
              <div className="p-6 w-full rounded-lg overflow-hidden max-w-lg sm:w-full py-10">
                <div className="flex justify-between items-center py-10 text-[textColor]">
                  <div className="flex items-center">
                    <Link href={profileLink}>
                      {data.user.image ? (
                          <div className='mr-2 w-[50px] h-[50px] relative'>
                            <Image src={data.user.image} alt="Avatar" height={50} width={50} className=" w-[50px] h-[50px] items-center rounded-full"/>
                          </div>
                        ) : (
                          <div className='mr-2 w-[50px] h-[50px] relative'>
                            <Image src="https://github.com/shadcn.png" alt="Avatar" height={50} width={50} className="w-[50px] h-[50px] items-center rounded-full"/>
                          </div>
                        )}
                      </Link>
                    {/* <Image src={data.user.image} alt="Avatar" height={50} width={50} className="rounded-full mr-2 object-cover" /> */}
                    <div className="flex flex-col items-left">
                    <Link href={profileLink}><span className="text-[black] font-semibold">{data?.user?.username ? data.user.username : data?.user?.name}</span></Link>
                      <span className="text-[#626262] capitalize">{data?.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    {!session || !session.user || !data || !data.id || session.user.email !== data.userEmail &&(
                      <span className="text-[#626262]">{formattedDate}</span>
                    )}

                    {session && session.user && data && data.id && session.user.email === data.userEmail && (
                      <>
                          {/* <p>Post Creator ID: {data.id}</p> */}
                          <Link href={data.type === 'DONATION' ? `/posts/update/donPost/${id}` : `/posts/update/reqPost/${id}`}>
                            <EditIcon sx={{ color: '#00A4BF' }}/>
                          </Link>
                      </>
                    )}

                    {/* Your other page content */}
                    {session && session.user && data && data.id && session.user.email === data.userEmail && (
                      <>
                          <Link href='/feed'>
                          {data.type === 'DONATION' ? (
                              <DeleteDonPost data={data} />
                            ) : (
                              <DeleteReqPost data={data} />
                            )}
                          </Link>
                      </>
                    )}
                  </div>
                  
                </div>
                <h4 className="text-[black] leading-tight mb-4">
                  {data?.desc}
                </h4>
                <h4 className="text-[black] leading-tight mb-4">
                  
                  <Badge variant="destructive" >{data?.category}</Badge>

                </h4>

                <div className="py-10">
                  <div className="flex gap-2">
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
                      src={phone}
                      alt="Phone"
                      width={20} height={20}
                    />
                  )}

                  <h3 className='underline'>
                  {data.isWhatsapp ? (
                    <Link href={`https://wa.me/+212${data.phone}`}>
                      {data.phone}
                    </Link>
                  ) : (
                    <Link href="#" className="pointer-events-none">
                      {data.phone}
                    </Link>
                  )}
                  </h3>


                  </div>                
                  {/* <p className="flex items-center gap-1">{data?.userEmail}</p> */}
                  <div className="flex gap-2">
                    {emailServiceLink && (
                      <Link href={emailServiceLink} passHref>
                        <button>
                          {data.user.email.includes('@gmail') && (
                            <Image src={gmail} alt="Gmail" width={20} height={20} />
                          )}
                          {data.user.email.includes('@yahoo') && (
                            <Image src={yahoo} alt="Yahoo" width={20} height={20} />
                          )}
                          {data.user.email.includes('@hotmail') && (
                            <Image src={hotmail} alt="Hotmail" width={20} height={20} />
                          )}
                          {/* Add a default image if none of the above conditions match */}
                          {!data.user.email.includes('@gmail') &&
                          !data.user.email.includes('@yahoo') &&
                          !data.user.email.includes('@hotmail') && (
                            <Image src={email} alt="Default" width={20} height={20} />
                          )}
                        </button>
                      </Link>
                    )}
                    {/* <h3 className='underline'><Link href={emailServiceLink} passHref>{data.user.email}</Link></h3> */}
                    {emailServiceLink && (
                      <h3 className='underline'>
                        <Link href={emailServiceLink} passHref>{data.user.email}</Link>
                      </h3>
                    )}
                    {/* Render the email link with default href if emailServiceLink doesn't exist */}
                    {!emailServiceLink && (
                      <h3 className='underline'>
                        <Link href={`mailto:${data.user.email}`} passHref>{data.user.email}</Link>
                      </h3>
                    )}
                  </div>
                </div>
                <div className="flex gap-5">
                {data.isWhatsapp ? (
                  <button role="button" aria-label="Subscribe" className="sm:mt-1 w-1/2 h-12 text-[white] bg-[#00A4BF] shadow-md text-base sm:text-xl hover:text-[#00A4BF] hover:bg-[white] hover:border-2 hover:border-[white ] hover:border-[#00A4BF] rounded-full">
                    <Link href={`https://wa.me/+212${data.phone}`} className="">
                      Via WhatsApp
                    </Link>
                  </button>
                ) : (
                  <button
                    role="button"
                    aria-label="Subscribe"
                    className="sm:mt-1 w-1/2 h-12 text-[white] bg-[#5de8fd] shadow-md text-base sm:text-xl hover:text-[#00A4BF] hover:bg-[white] hover:border-2 hover:border-[white ] hover:border-[#7ceeff] rounded-full"
                    disabled
                  >
                    Via WhatsApp
                  </button>
                )}
                  
                  <button role="button" aria-label="Subscribe" className="sm:mt-1 w-1/2 h-12 text-[white] bg-[#00A4BF] shadow-md text-base sm:text-xl hover:text-[#00A4BF] hover:bg-[white] hover:border-2 hover:border-[white ] hover:border-[#00A4BF] rounded-full"> <Link href={emailServiceLink}>Via E-mail</Link></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      {/* <DonRelatedPosts category={data?.category} postId={data?.id} /> */}
      {getRandomComponent()}


    </>
  );
};

export default Page;











// <div className={styles.container}>
//             <div className={styles.infoContainer}>
//               <div className={styles.textContainer}>
//                 <Link href={`/profile/${data.user.id}`}>
//                   <h1 className={styles.title}>
//                     {data?.title}
//                   </h1>
//                 </Link>
//                 <div className={styles.user}>
//                   <Link href={`/profile/${data.user.id}`}>
//                     {data?.user?.image ? (
//                       <div className={styles.userImageContainer}>
//                         <Image src={data.user.image} alt="" fill className={styles.avatar} />
//                       </div>
//                     ) : (
//                       <div className={styles.userImageContainer}>
//                         <Image src="https://github.com/shadcn.png" alt="Default Image" fill className={styles.avatar} />
//                       </div>
//                     )}
//                   </Link>
                  
//                   <div className={styles.userTextContainer}>
//                     <span className={styles.username}>
//                       {data?.user?.username ? data.user.username : data?.user?.name}
//                     </span>
//                     <span className={styles.date}>{formattedDate}</span>
//                   </div>
//                 </div>
//               </div>
//               {data?.img && (
//                 <div className={styles.imageContainer}>
//                   <Image src={data.img} alt="" fill className={styles.image} />
//                 </div>
//               )}
//             </div>
//             <div>
//               <div className='flex gap-3'>
//                 {data.isWhatsapp ? (
//                   <Link href={`https://wa.me/+212${data.phone}`}>
//                     <Image
//                       src={whatsapp}
//                       alt="WhatsApp"
//                       width={20} height={20}
//                     />
//                   </Link>
//                 ) : (
//                   <Image
//                     src={phone}
//                     alt="Phone"
//                     width={20} height={15}
//                   />
//                 )}
//                 <h3 className=''><Link href={`https://wa.me/+212${data.phone}`}>{data.phone}</Link></h3>
//               </div>
//               <div className='flex gap-3'>
                // {emailServiceLink && (
                //   <Link href={emailServiceLink} passHref>
                //     <button>
                //       {data.user.email.includes('@gmail') && (
                //         <Image src={gmail} alt="Gmail" width={20} height={20} />
                //       )}
                //       {data.user.email.includes('@yahoo') && (
                //         <Image src={yahoo} alt="Yahoo" width={20} height={20} />
                //       )}
                //       {data.user.email.includes('@hotmail') && (
                //         <Image src={hotmail} alt="Hotmail" width={20} height={20} />
                //       )}
                //       {/* Add a default image if none of the above conditions match */}
                //       {!data.user.email.includes('@gmail') &&
                //       !data.user.email.includes('@yahoo') &&
                //       !data.user.email.includes('@hotmail') && (
                //         <Image src={email} alt="Default" width={20} height={20} />
                //       )}
                //     </button>
                //   </Link>
                // )}
//                 <h3>
//                   <Link href={email} passHref>
//                     {data.user.email}
//                   </Link>
//                 </h3>
//               </div>
//             </div>
//             <div className={styles.content}>
//               <div className={styles.post}>
//                 <div
//                   className={styles.description}
//                 />
//                 {data.desc}
//               </div>
//               <div className='flex gap-3'>
//                 <h2>Views :</h2>
//                 <h3>{data.views}</h3>
//               </div>
//             </div>
//         {/* <p>Post Creator ID: {data.id}</p>
//         <p>User ID: {session.user.email}</p>
//         <p>{session?.user.username}</p> */}
        


        // {session && session.user && data && data.id && session.user.email === data.userEmail && (
        // <>
        //     {/* <p>Post Creator ID: {data.id}</p> */}
        //     <Link href={`/posts/update/${id}`}>
        //         <button>Update</button>
        //     </Link>
        // </>
// )}





            
//           </div>



















// <>
//       <div className='min-h-screen bg-bg text-textColor'>
//         <div className='max-w-screen-xl mx-auto'>
//             <Navbar />
//             <div>
//               <div className="w-full h-full ">
//                 <h1 className='text-4xl text-[black]'>Details post</h1>
//                   <div className=" bg-[white] flex ">
//                   <Link href={`/profile/${data.user.id}`}>
//                    <h1 className={styles.title}>
//                     {data?.title}
//                    </h1>
//                   </Link>
//                     <div className="w-1/2 p-2">
//                       <img src="imagePost.png" alt="" />
//                     </div>
//                   <div className="w-1/2">
//                     <p>{data.desc}</p>
//                   <div className=''>
//                     <p><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <g clip-path="url(#clip0_260_106)">
//                       <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 13.89 2.525 15.66 3.438 17.168L2.546 20.2C2.49478 20.3741 2.49141 20.5587 2.53624 20.7346C2.58107 20.9104 2.67245 21.0709 2.80076 21.1992C2.92907 21.3276 3.08958 21.4189 3.26542 21.4638C3.44125 21.5086 3.62592 21.5052 3.8 21.454L6.832 20.562C8.39068 21.5051 10.1782 22.0025 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM9.738 14.263C11.761 16.285 13.692 16.552 14.374 16.577C15.411 16.615 16.421 15.823 16.814 14.904C16.8636 14.7897 16.8816 14.6641 16.8661 14.5405C16.8507 14.4168 16.8023 14.2996 16.726 14.201C16.178 13.501 15.437 12.998 14.713 12.498C14.5618 12.3935 14.3761 12.3516 14.1947 12.381C14.0133 12.4105 13.8503 12.509 13.74 12.656L13.14 13.571C13.1085 13.6202 13.0593 13.6555 13.0026 13.6696C12.9459 13.6837 12.8859 13.6756 12.835 13.647C12.428 13.414 11.835 13.018 11.409 12.592C10.983 12.166 10.611 11.6 10.402 11.219C10.3761 11.1706 10.3686 11.1144 10.3809 11.0609C10.3932 11.0074 10.4245 10.9602 10.469 10.928L11.393 10.242C11.5249 10.1273 11.61 9.9682 11.6321 9.79486C11.6542 9.62153 11.6118 9.44611 11.513 9.302C11.065 8.646 10.543 7.812 9.786 7.259C9.68831 7.1882 9.57386 7.14406 9.45393 7.13091C9.334 7.11776 9.21271 7.13606 9.102 7.184C8.182 7.578 7.386 8.588 7.424 9.627C7.449 10.309 7.716 12.24 9.738 14.263Z" fill="#EF507F"/>
//                     </g>
//                   <defs>
//                     <clipPath id="clip0_260_106">
//                       <rect width="24" height="24" fill="white"/>
//                     </clipPath>
//                   </defs>
//                   </svg>
//                      +212-509432746
//                   </p>
//             <p>
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M20 8L12 13L4 8V6L12 11L20 6M20 4H4C2.89 4 2 4.89 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4Z" fill="#EF507F"/>
//               </svg>
//                 Youss.ra22@gmail.com
//             </p>
//             </div>
//             <div className='flex gap-5'>
            {/* <button role="button" aria-label="Subscribe" className="relative  mt-10 right-0 top-0   w-full  sm:w-96  h-12 text-[white] bg-[#00A4BF]  shadow-md   text-2xl  font-medium  hover:text-[#00A4BF] hover:bg-[white] border-2 border-[white ] hover:border-white rounded-full">Subscribe</button>
            <button role="button" aria-label="Subscribe" className="relative  mt-10 right-0 top-0   w-full  sm:w-96  h-12 text-[white] bg-[#00A4BF]  shadow-md   text-2xl  font-medium  hover:text-[#00A4BF] hover:bg-[white] border-2 border-[white ] hover:border-white rounded-full">Subscribe</button> */}
{/* 
            </div>
            </div>
        </div>
        </div>
      
    </div>
          
        </div>
        <Footer />
      </div>
    </> */}