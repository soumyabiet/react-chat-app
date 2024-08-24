// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlgR4DYNtuUaAmkddwtgkQAaxqLeeXkl4",
  authDomain: "react-chat-app-d0946.firebaseapp.com",
  databaseURL: "https://react-chat-app-d0946-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-d0946",
  storageBucket: "react-chat-app-d0946.appspot.com",
  messagingSenderId: "366962398366",
  appId: "1:366962398366:web:e80e066f9114f41987d78f",
  measurementId: "G-9F4DHFVRD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { 
  app as FirebaseApp, 
  db as FireStoreDb, 
  auth as FirebaseAuth 
};