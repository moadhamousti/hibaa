"use client"
import Navbar from '@/components/Navbar';
import '../app/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Provider from '@/components/Provider';
import NProgressComponent from '@/components/NProgress';


export default function RootLayout({ children }) {
  return (
    <html lang='en' className="!scroll-smooth">
      <body >
          <Provider>
            <NProgressComponent>
              <main className=''>
                <div className=''>
                  {/* <Navbar /> */}
                    {children}
                  {/* <Footer/> */}
                </div>
              </main>
              <Toaster/>
              </NProgressComponent>
          </Provider>
      </body>
    </html>
    // className={inter.className}
  );
}
