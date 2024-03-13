import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <main className=''>
      <div className=''>
        {children}
      </div>
    </main>
  )
};

export default AuthLayout;
