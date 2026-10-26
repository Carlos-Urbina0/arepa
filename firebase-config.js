// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCNzXK-wofcnKRP60gqKGzCdQwZ2ClY5w",
  authDomain: "arepa-express-5bd9e.firebaseapp.com",
  projectId: "arepa-express-5bd9e",
  storageBucket: "arepa-express-5bd9e.firebasestorage.app",
  messagingSenderId: "655112368360",
  appId: "1:655112368360:web:9140d531a6bbca8025995d",
  measurementId: "G-X2Z8HJ7QBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);