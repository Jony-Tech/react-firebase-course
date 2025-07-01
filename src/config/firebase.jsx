// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiPPVl9O7xrg1baogFCX_sJotkUDiBhDE",
  authDomain: "fir-course-74460.firebaseapp.com",
  projectId: "fir-course-74460",
  storageBucket: "fir-course-74460.firebasestorage.app",
  messagingSenderId: "641699283309",
  appId: "1:641699283309:web:2a509019e0dbc341b39a64",
  measurementId: "G-PGDVBGK532"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);