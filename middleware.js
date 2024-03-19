// middleware.js

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const publicRoutes = ['/', '/feed']; // Define the routes that should be accessible to all users
const restrictedRoutesForNonAuth = ['/publish/donatePost', '/profile']; // Define the routes that require authentication for non-authenticated users
const restrictedRoutesForAuth = ['/sign-in', '/sign-up']; // Define the routes that should not be accessible to authenticated users

const isRestrictedForNonAuth = (pathname) => restrictedRoutesForNonAuth.includes(pathname);
const isRestrictedForAuth = (pathname) => restrictedRoutesForAuth.includes(pathname);

const middleware = async (ctx) => {
  const { req, res } = ctx;

  const { session } = await getSession({ req });

  const router = useRouter();

  const { pathname } = router;

  // Handle dynamic route for single post
  if (pathname.startsWith('/posts/')) {
    const postId = pathname.split('/posts/')[1]; // Extract post ID from the pathname
    publicRoutes.push(`/posts/${postId}`); // Add the dynamic route to public routes
  }

  if (!session && isRestrictedForNonAuth(pathname)) {
    res.writeHead(302, { Location: '/sign-in' });
    res.end();
    return;
  }

  if (session && isRestrictedForAuth(pathname)) {
    res.writeHead(302, { Location: '/' }); // Redirect authenticated users from restricted routes
    res.end();
    return;
  }

  return;
};

export default middleware;
