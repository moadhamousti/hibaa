// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "charity-89639.firebaseapp.com",
  projectId: "charity-89639",
  storageBucket: "charity-89639.appspot.com",
  messagingSenderId: "942022868106",
  appId: "1:942022868106:web:00ce5a1564a38bf18fc173",
  measurementId: "G-6LS2K50QF4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);