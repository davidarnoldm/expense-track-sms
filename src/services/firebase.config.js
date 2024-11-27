// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAZsuZClHM4bz53WCRhiz9IFncAnRF4OQ",
  authDomain: "personal-expense-tracker-ae6eb.firebaseapp.com",
  projectId: "personal-expense-tracker-ae6eb",
  storageBucket: "personal-expense-tracker-ae6eb.firebasestorage.app",
  messagingSenderId: "369819599721",
  appId: "1:369819599721:web:9f278fbe5c56cd87ecf3f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const authent = getAuth(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;