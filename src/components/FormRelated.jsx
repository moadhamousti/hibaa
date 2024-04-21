"use client"

import PageLayout from '@/app/(blog)/layout';
import Card from '@/components/Card';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import FormCard from './FormCard';

const FormRelated = ({ location, formId }) => {
  const { data: session } = useSession();
  const [relatedForms, setRelatedForms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/form/relatedForms/${location}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Could not load forms");
        }

        const data = await res.json();
        // Filter forms by location
        const formsWithSameLocation = data.filter(form => form.location === location);
        setRelatedForms(formsWithSameLocation);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchData();
  }, [location]);

  // Filter and limit forms
  const filteredForms = relatedForms.filter(form => form.id !== formId && form.isValidated === 'VALIDER');
  const limitedForms = filteredForms.slice(0, 3);

  return (
    <PageLayout>
      <div>
        <div className="mt-5 mb-5">
          <h2 className='text-2xl font-semibold'>Pharmacies à proximité</h2>
        </div>
        {limitedForms.length === 0 ? (
          <div className="items-center text-center p-[50px] mb=[40px]">
            <p className=''>Aucun Pharmacies à proximité à afficher</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {limitedForms.map((form) => (
              <FormCard key={form.id} item={form} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default FormRelated;
