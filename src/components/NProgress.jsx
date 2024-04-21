// NProgressComponent.jsx
"use client"
import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname } from 'next/router'; // Import usePathname from next/router
import '../app/globals.css';

export default function NProgressComponent() {
    const pathname = usePathname(); // Use usePathname hook to get the current pathname

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

        // Start progress bar when pathname changes
        startProgressBar();

        // Stop progress bar after a delay
        stopProgressBar();

        // Clean up
        return () => {
            // Cleanup logic if needed
        };
    }, [pathname]); // Listen for changes in pathname

    return null; // This component doesn't render anything
}
