// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth, CreateUserWithEmailAndPassword} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0qKBC9FcYl1dbUZ5A6C5VwI8ZxqRFHUU",
  authDomain: "facebook-75901.firebaseapp.com",
  projectId: "facebook-75901",
  storageBucket: "facebook-75901.appspot.com",
  messagingSenderId: "1070199089935",
  appId: "1:1070199089935:web:843b0941b3d55fa234ac7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const authentication=getAuth(app);
