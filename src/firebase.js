// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2pj20kJtCXc4PROJh0M6gYgYQ-FZSWDs",
  authDomain: "maidfinder-8bd4c.firebaseapp.com",
  projectId: "maidfinder-8bd4c",
  storageBucket: "maidfinder-8bd4c.firebasestorage.app",
  messagingSenderId: "234726074957",
  appId: "1:234726074957:web:a94fef647c292b4e8a8a04",
  measurementId: "G-04TPCD2ZND",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
