"use client"
import { useEffect, useState } from 'react';
import FormCard from '@/components/FormCard';

const Page = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Fetch form data here and set it to the formData state
    const fetchFormData = async () => {
      try {
        const response = await fetch(`/api/form/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, []);

  return (
    <div>
      {formData && <FormCard item={formData} />}
    </div>
  );
};

export default Page;
