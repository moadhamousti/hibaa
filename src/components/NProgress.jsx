// NProgressComponent.jsx
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import '../app/globals.css';
import { usePathname } from 'next/navigation';


export default function NProgressComponent() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    NProgress.configure({ trickleRate: 0.02, trickleSpeed: 800 });
    NProgress.start();

    const handleComplete = () => {
      NProgress.done();
    };

    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router.events]);

  return null;
}
