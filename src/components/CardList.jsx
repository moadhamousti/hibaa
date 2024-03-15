import React from 'react';
import Card from './Card'; // Import your Card component here
import Pagination from './Pagination';

const CardList = ({ data }) => {

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>

    </div>
      <Pagination/>
    </div>
    
  );
};

export default CardList;
