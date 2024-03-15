import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyClZrwNaYaV4rTy8Cuscdh8f8p5oFDTe3U",
  authDomain: "student-crud-ccfc6.firebaseapp.com",
  projectId: "student-crud-ccfc6",
  storageBucket: "student-crud-ccfc6.appspot.com",
  messagingSenderId: "868584772453",
  appId: "1:868584772453:web:6d735a314cb61b08e1878c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
