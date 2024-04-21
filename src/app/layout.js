"use client"
import Navbar from '@/components/Navbar';
import '../app/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Provider from '@/components/Provider';
import Footer from '@/components/Footer';
import NProgress from 'nprogress';
import { usePathname, useRouter } from 'next/navigation'; 
import { useEffect } from 'react';


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    NProgress.configure({ trickleRate: 0.02, trickleSpeed: 800 });
    NProgress.start();
    setTimeout(()=>{
      NProgress.done();
    }, 3000)
  }, [pathname]);
  return (
    <html lang='en' className="!scroll-smooth">
      <body >
          <Provider>
              <main className=''>
                <div className=''>
                  {/* <Navbar /> */}
                    {children}
                  {/* <Footer/> */}
                </div>
              </main>
              <Toaster/>
          </Provider>
      </body>
    </html>
    // className={inter.className}
  );
}
