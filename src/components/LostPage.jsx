"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LostPage = () => {
  const router = useRouter();

  // Redirect to / after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/');
    }, 5000); // 10 seconds

    // Clear the timer on component unmount to prevent memory leaks
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Are you lost?</h1>
      <p className="text-lg">You will be redirected to the home page shortly...</p>
    </div>
  );
};

export default LostPage;
