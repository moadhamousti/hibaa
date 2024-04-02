"use client"
import React, { useState, useEffect } from 'react';

const MedToolsTypeFilter = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/categories", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    // Pass the selected category to the parent component
    onCategorySelect(event.target.value);
  };

  return (
    <div className="relative">
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-10 overflow-y-auto"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Select Category</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MedToolsTypeFilter;
