// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9967e.firebaseapp.com",
  projectId: "mern-estate-9967e",
  storageBucket: "mern-estate-9967e.appspot.com",
  messagingSenderId: "527361866180",
  appId: "1:527361866180:web:4f045909ee5b0cd85c0c91"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);