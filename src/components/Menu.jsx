// Menu.jsx
"use client"
import React, { useState } from 'react';
import LocationFilter from './LocationFilter';
import MedToolsTypeFilter from './MedToolsTypeFilter';
import { Button } from './ui/button';

const Menu = () => {

  return (
    <div>
      <div className='flex justify-between gap-6 mt-9'>
        <LocationFilter/>
        <MedToolsTypeFilter />
        <Button>Filter</Button>
      </div>
    </div>
  );
};

export default Menu;
