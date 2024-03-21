// Menu.jsx
"use client"
import React, { useState } from 'react';
import LocationFilter from './LocationFilter';
import MedToolsTypeFilter from './MedToolsTypeFilter';
import { Button } from './ui/button';

const Menu = ({ onFilter }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleFilter = () => {
    console.log("Filter button clicked");
    console.log("Selected Location:", selectedLocation);
    console.log("Selected Category:", selectedCategory);
    onFilter(selectedLocation, selectedCategory); // Pass selectedLocation and selectedCategory to onFilter
  };

  return (
    <div>
      <h1>Choose your options to filter posts:</h1>
      <div className='flex justify-between gap-6'>
        <LocationFilter onChange={(e) => setSelectedLocation(e.target.value)} />
        <MedToolsTypeFilter onChange={(e) => setSelectedCategory(e.target.value)} />
        <Button onClick={handleFilter}>Filter</Button>
      </div>
    </div>
  );
};

export default Menu;
