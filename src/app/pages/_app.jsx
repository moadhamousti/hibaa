// import { Router } from 'lucide-react';
// import { useEffect } from 'react';
// import LoadingBar from 'react-top-loading-bar'

// export default function MyApp({ Component, pageProps }) {
//     const [progress, setProgress] = useState(0)

//     useEffect(()=>{
//         Router.events.on(`routeChangeComplete`, () => {
//             setProgress(100)
//         })
//     })

//     }
//   return (
//     <>
//     <LoadingBar
//         color='#f11946'
//         progress={progress}
//         onLoaderFinished={() => setProgress(0)}
//       />
//       <Component {...pageProps} />;
//     </>
//   );
