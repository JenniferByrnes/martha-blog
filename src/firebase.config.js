import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVPjTsKmc6F1dmWAB-M8b9YPcf-gnupEQ",
  authDomain: "project-martha-e7c69.firebaseapp.com",
  projectId: "project-martha-e7c69",
  storageBucket: "project-martha-e7c69.appspot.com",
  messagingSenderId: "239197673255",
  appId: "1:239197673255:web:95c5f5c9dc5b5053e67b02"
};


// Initialize Firebase
// initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// Firebase storage reference
// const storage = getStorage(app);
// export default storage;