// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDErXSKA5qYuv6wunUIjUIMKWtV-ejRFuc",
  authDomain: "todo-react-3ba9e.firebaseapp.com",
  projectId: "todo-react-3ba9e",
  storageBucket: "todo-react-3ba9e.appspot.com",
  messagingSenderId: "795914245456",
  appId: "1:795914245456:web:25ca1d35745c948bcf4855"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db}