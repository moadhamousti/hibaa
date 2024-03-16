"use client"
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import TopLoadingBar from 'react-top-loading-bar';

const TopProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleStart = () => {
      setProgress(0);
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
      }, 500); // Optional: Add a small delay before resetting to 0
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return <TopLoadingBar progress={progress} color="red" height={10} />;
};

export default TopProgressBar;
