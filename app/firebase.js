// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3fSc1xi39gL0uyB_ZVQoAKTJ0FbKtfwQ",
  authDomain: "inventorytracker-6fdb6.firebaseapp.com",
  projectId: "inventorytracker-6fdb6",
  storageBucket: "inventorytracker-6fdb6.appspot.com",
  messagingSenderId: "746308319307",
  appId: "1:746308319307:web:95ba2e1e34f023b24135ce",
  measurementId: "G-7G97K5GZXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export{firestore}