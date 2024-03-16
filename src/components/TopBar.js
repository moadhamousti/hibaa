// "use client"
// import { useEffect } from 'react';
// import Router from 'next/router';
// import NProgress from 'nprogress';

// const TopLoadingBar = () => {
//   useEffect(() => {
//     const start = () => {
//       console.log('Route change started');
//       NProgress.start();
//     };

//     const end = () => {
//       console.log('Route change completed');
//       NProgress.done();
//     };

//     Router.events.on('routeChangeStart', start);
//     Router.events.on('routeChangeComplete', end);
//     Router.events.on('routeChangeError', end);

//     return () => {
//       console.log('Cleaning up...');
//       Router.events.off('routeChangeStart', start);
//       Router.events.off('routeChangeComplete', end);
//       Router.events.off('routeChangeError', end);
//     };
//   }, []);

//   return (
//     <div className="h-1 bg-blue-500 fixed top-0 left-0 right-0 z-50">
//       {/* Progress bar will be shown here */}
//     </div>
//   );
// };

// export default TopLoadingBar;
