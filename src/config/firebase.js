// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHaCoiXgvV0LLVEGdmH50mBhInFTDAtks",
  authDomain: "fir-course-6e8dd.firebaseapp.com",
  projectId: "fir-course-6e8dd",
  storageBucket: "fir-course-6e8dd.appspot.com",
  messagingSenderId: "971918128741",
  appId: "1:971918128741:web:734e9614b02ea0def5788c",
  measurementId: "G-7KSQDC3T1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)