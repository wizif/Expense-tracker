import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBudndxPUMMFdZLdR15K25zm-xx0TbnMw",
  authDomain: "expense-tracker-f8022.firebaseapp.com",
  projectId: "expense-tracker-f8022",
  storageBucket: "expense-tracker-f8022.firebasestorage.app",
  messagingSenderId: "1012139366445",
  appId: "1:1012139366445:web:221ddbf8efd5a0292e40a4",
  measurementId: "G-EEMBQVKMJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database (for storing expenses later)
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
