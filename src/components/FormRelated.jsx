import React from 'react'
import FormCard from './FormCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/form',{
    cache: "no-store",
  });

  if(!res.ok) {
    throw new Error("Could not load forms");
  }
  console.log("data",res)


  return res.json();
  
}



const FormRelated = async () => {
    const { data: session } = getServerSession(authOptions);
  console.log("session", session);

  const { items } = await getData();
    
    return (
        <div className="max-w-screen-xl mx-auto">
            <h1>Forms</h1>
            <ul>
                {items.map((item) => (
                <li key={item.phaName}>{/* Replace with the desired fields */}</li>
                ))}
            </ul>
            </div>
      );
    };


export default FormRelated