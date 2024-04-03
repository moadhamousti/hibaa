import React from 'react';
import styles from './about.module.css'
import OurVision from '@/components/About/Vision/Vision';
import JoinUs from '@/components/About/Join/Join';
import MakeDifference from '@/components/About/MakeDifference/MakeDifference';
import About from '@/components/About/AboutSec/About';
import Navbar from '@/components/Navbar';
import PageLayout from '../(blog)/layout';

const AboutPage = () => {
  return (
    <>
    <PageLayout>
      <Navbar/>
    </PageLayout> 
    <div className={styles.container}>
      <About/>
      <OurVision/>
      <JoinUs/>
      <MakeDifference/>
    </div >
  </>
  );
};

export default AboutPage;