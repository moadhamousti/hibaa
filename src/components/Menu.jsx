// Menu.jsx
"use client"
import React, { useState } from 'react';
import LocationFilter from './LocationFilter';
import MedToolsTypeFilter from './MedToolsTypeFilter';
import { Button } from './ui/button';

const Menu = () => {

  return (
    <div>
      <h1>Choose your options to filter posts:</h1>
      <div className='flex justify-between gap-6'>
        <LocationFilter/>
        <MedToolsTypeFilter />
        <Button>Filter</Button>
      </div>
    </div>
  );
};

export default Menu;
