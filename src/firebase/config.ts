import  { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_LslMMotn8o134Qzw_VgMAtwNWsmm5QE",
  authDomain: "kylo-8dc81.firebaseapp.com",
  projectId: "kylo-8dc81",
  storageBucket: "kylo-8dc81.firebasestorage.app",
  messagingSenderId: "473188444998",
  appId: "1:473188444998:web:47e71965efbc038db61347",
  measurementId: "G-S8RB74WKJX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
 