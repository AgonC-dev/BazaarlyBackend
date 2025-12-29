// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYVeR4MhjmPibw1xYWzVAwXlHa6oFdC4Y",
  authDomain: "bazaarly-a7d25.firebaseapp.com",
  projectId: "bazaarly-a7d25",
  storageBucket: "bazaarly-a7d25.firebasestorage.app",
  messagingSenderId: "907665169528",
  appId: "1:907665169528:web:564dccf852ee34f9b4618d",
  measurementId: "G-82CPSL1Q0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);