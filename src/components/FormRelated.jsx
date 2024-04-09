"use client"

import PageLayout from '@/app/(blog)/layout';
import FormCard from '@/components/FormCard';
import { authOptions } from '@/lib/auth';
import { getServerSession, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const FormRelated = () => {
  const { data: session } = useSession();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/form', {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Could not load forms");
        }

        const data = await res.json(); // Parse JSON from the response
        setForms(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <PageLayout>
    <div className="">
      <div className="mt-5 mb-5">
        <h2 className='text-2xl font-semibold'>Pharmacies à proximité</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((item) => (
          <FormCard item={item} key={item.id}/>
        ))}
      </div>
    </div>
    </PageLayout>
  );
};

export default FormRelated;
