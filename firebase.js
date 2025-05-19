// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNXl0W98L5us6lNJTxaA7SW2OzSJc3Q-g",
  authDomain: "replicaide.firebaseapp.com",
  projectId: "replicaide",
  storageBucket: "replicaide.firebasestorage.app",
  messagingSenderId: "470303485706",
  appId: "1:470303485706:web:dc21ae3e215d98dcc454f3",
  measurementId: "G-ERD9FTW06P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);