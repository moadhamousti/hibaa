
import TopLoadingBar from '@/components/TopBar';
import TopProgressBar from '@/components/TopProgressBar';
import React from 'react';

const PageLayout = ({ children }) => {
  return (
    <>
    <div className='max-w-screen-xl mx-auto px-0'>
        <div className='max-w-screen-xl mx-auto px-8'>
            {children}
        </div>
    </div>
  </>
  )
  
};

export default PageLayout;
