// // utils/emailValidator.js
// const axios = require('axios');

// export const validateEmail = async (email) => {
//   const options = {
//     method: 'GET',
//     url: 'https://mailcheck.p.rapidapi.com/',
//     params: {
//       domain: email.split('@')[1] // Extract domain from email
//     },
//     headers: {
//       'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
//       'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     return response.data;
//   } catch (error) {
//     console.error('Error validating email:', error);
//     return { message: 'Error validating email' };
//   }
// };




// pages/api/validateEmail.js

