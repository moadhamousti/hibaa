// NProgressComponent.jsx
"use client"
// NProgressComponent.jsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router
import NProgress from 'nprogress';
import '../app/globals.css';

export default function NProgressComponent() {
    const router = useRouter(); // Use useRouter hook

    useEffect(() => {
        const startProgressBar = () => {
            NProgress.configure({ trickleRate: 0.02, trickleSpeed: 800 });
            NProgress.start();
        };

        const stopProgressBar = () => {
            setTimeout(() => {
                NProgress.done();
            }, 3000);
        };

        // Start progress bar when route change starts
        const handleRouteChangeStart = () => startProgressBar();
        router.events.on('routeChangeStart', handleRouteChangeStart);

        // Stop progress bar when route change completes
        const handleRouteChangeComplete = () => stopProgressBar();
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        // Clean up event listeners
        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [router]); // Listen for changes in router object

    return null; // This component doesn't render anything
}
