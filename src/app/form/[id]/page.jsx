import NavbarSimple from '@/components/NavbarSimple'
import React from 'react'
import Image from 'next/image';
import defaultImage from '../../../../public/culture.png';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import whatsapp from "../../../../public/whatsapp.png";
import gmail from "../../../../public/Gmail.png";
import hotmail from "../../../../public/hotmail.png";
import yahoo from "../../../../public/yahoo.png";
import email from "../../../../public/email.png";
import facebook from "../../../../public/CFacebook.png";
import twitter from "../../../../public/CTwitter.png";
import instagram from "../../../../public/CInstagram.png";
import loacation from "../../../../public/Location.png";
import dynamic from 'next/dynamic';
import phone from "../../../../public/phone.png";
import Map from '@/components/Map';




const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/form/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  console.log("response",res)

  return res.json();
};


const Page = async ({params}) => {
  

  const { id } = params;
  const data = await getData(id);

  console.log("data",data)

  const session = await getServerSession(authOptions);
  console.log("session", session)


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
  const twitterURL = `https://${data.twitter}`;
  const facebookURL = `https://${data.facebook}`;
  const instagramURL = `https://${data.instagram}`;



  
  
  return (
    <div className='min-h-screen bg-bg text-textColor '>
      <div className='max-w-screen-xl mx-auto px-2'>
        <NavbarSimple />
        <div className='py-6 shadow-lg mb-8'>
          <h1 className="text-4xl text-[black] rounded-lg font-bold fsm:my-4 capitalize text-center sm:text-left">Détails Form</h1>
          <div className="sm:flex justify-between">
            <div className="">
              <p></p>
            </div>
            <div className="w-full sm:w-full">
              <div className="mt-10 bg-[white] h-[450px] w-full rounded overflow-hidden">
                <div className="flex justify-between px-7">
                  <div className="mb-6 ">
                      <p className='text-[30px] text-[--darkishBlue]'><strong className='text-[30px] text-black'>Pharmacie </strong>{data.phaName}</p>
                    </div>
                    <div className="flex gap-3">
                      {!session || !session.user || !data || !data.id || session.user.email !== data.userEmail &&(
                        <span className="text-[#626262]">{formattedDate}</span>
                      )}

                      {session && session.user && data && data.id && session.user.email === data.userEmail && (
                        <>
                            <Link href={`/form/update/${id}`}>
                              <EditIcon sx={{ color: '#00A4BF' }}/>
                            </Link>
                        </>
                      )}
                    </div>
                </div>
                  
                <Image src={data.img} width={1000} height={1000} alt="Image" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          {/* Flexed small image for user and name */}
          <div className="flex items-left sm:mt-0 justify-left mt-6 p-[20px] rounded-lg bg-gray-200">
            <div className="mr-4 w-16 h-16 relative mt-4">
              <Image src={data.user?.image} alt="Avatar" layout="fill" objectFit="cover" className="rounded-full" />
            </div>
            <div className='mt-5'>
              <Link href={profileLink}><h2 className="text-lg font-semibold text-left" >{data.user?.name}</h2></Link>
              <h2 className="text-lg font-normal text-left text-[--pink]">{data.location}</h2>
            </div>
          </div>
          <div className="items-center text-center mb-5 mt-6">
            <h1 className='font-semibold text-[30px]	'>Pharmacie Informations</h1>
            <div className="p-5 items-center text-center">
                <p>{data.desc}</p>
            </div>
          </div>
          
          <div className="p-7 ">
            <div className="py-10">
                    <div className="flex gap-2 mb-3">
                    {data.isWhatsapp ? (
                      <Link href={`https://wa.me/+212${data.phone}`}>
                        <Image
                          src={whatsapp}
                          alt="WhatsApp"
                          width={25} height={25}
                        />
                      </Link>
                    ) : (
                      <Image
                        src={phone}
                        alt="Phone"
                        width={25} height={25}
                      />
                    )}

                    <h3 className='underline text-[30] font-semibold	'>
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
              {data.instagram && (
                <div className="flex gap-2 mb-3">
                  <Image width={25} height={25} src={instagram}/>
                  <Link href={instagramURL}><h3 className='underline text-[30] font-semibold'>{data.instagram}</h3></Link>
                </div>
              )}

              {data.facebook && (
                <div className="flex gap-2 mb-3">
                  <Image width={25} height={25} src={facebook}/>
                  <Link href={facebookURL}><h3 className='underline text-[30] font-semibold'>{data.facebook}</h3></Link>
                </div>
              )}

              {data.twitter && (
                <div className="flex gap-2 mb-3">
                  <Image width={25} height={25} src={twitter}/>
                  <Link href={twitterURL}><h3 className='underline text-[30] font-semibold'>{data.twitter}</h3></Link>
                </div>
              )}

              <div className="flex gap-2 mb-3">
                    {emailServiceLink && (
                      <Link href={emailServiceLink} passHref>
                        <button>
                          {data.user.email.includes('@gmail') && (
                            <Image src={gmail} alt="Gmail" width={25} height={25} />
                          )}
                          {data.user.email.includes('@yahoo') && (
                            <Image src={yahoo} alt="Yahoo" width={25} height={25} />
                          )}
                          {data.user.email.includes('@hotmail') && (
                            <Image src={hotmail} alt="Hotmail" width={25} height={25} />
                          )}
                          {/* Add a default image if none of the above conditions match */}
                          {!data.user.email.includes('@gmail') &&
                          !data.user.email.includes('@yahoo') &&
                          !data.user.email.includes('@hotmail') && (
                            <Image src={email} alt="Default" width={25} height={25} />
                          )}
                        </button>
                      </Link>
                    )}
                  
                  {emailServiceLink && (
                      <h3 className='underline text-[30] font-semibold'>
                        <Link href={emailServiceLink} passHref>{data.user.email}</Link>
                      </h3>
                    )}
                    {/* Render the email link with default href if emailServiceLink doesn't exist */}
                    {!emailServiceLink && (
                      <h3 className='underline text-[30] font-semibold'>
                        <Link href={`mailto:${data.user.email}`} passHref>{data.user.email}</Link>
                      </h3>
                    )}
                  </div>
              </div>
              <div className="flex gap-2">
                    <Image width={25} height={25} src={loacation}/>
                    <h3 className='underline text-[30] font-semibold'>{data.address}</h3>
              </div>

              {data.longitude && data.latitude && (
                <div className="flex-2 h-[100%] bg-white mt-5">
                  <Map items={[data]}/>
                </div>
              )}

          </div>
          </div>
        </div>
        
      </div>
  )
}

export default Page
