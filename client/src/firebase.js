
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "ums-redux.firebaseapp.com",
  projectId: "ums-redux",
  storageBucket: "ums-redux.appspot.com",
  messagingSenderId: "1069645678807",
  appId: "1:1069645678807:web:4f7f5f002e8bfd5363c892"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);