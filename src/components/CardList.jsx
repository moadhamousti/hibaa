import React from 'react';
import Card from './Card'; // Import your Card component here
import Pagination from './Pagination';

const CardList = ({ data }) => {

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
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
