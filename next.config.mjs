/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["firebasestorage.googleapis.com", "lh3.googleusercontent.com","github.com","www.medisave.co.uk","static.medias24.com"]
    }
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
// import nextImages from 'next-images';

// const nextConfig = nextImages({
//     images: {
//         domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com", "github.com", "www.medisave.co.uk", "static.medias24.com"],
//         // Specify the image formats to optimize
//         formats: ['image/webp', 'image/avif'],
//         // Optionally, enable or disable image optimization
//         disableStaticImages: false,
//     },
//     webpack: (config, { isServer }) => {
//         // Add loader for SVG files
//         config.module.rules.push({
//             test: /\.svg$/,
//             use: ['@svgr/webpack'],
//         });

//         return config;
//     },
// });

// export default nextConfig;

