// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvhJIuwY1ms610WG-tDggIcuKbGrSEd5o",
  authDomain: "specify-ec0ca.firebaseapp.com",
  databaseURL:
    "https://specify-ec0ca-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "specify-ec0ca",
  storageBucket: "specify-ec0ca.appspot.com",
  messagingSenderId: "627502848273",
  appId: "1:627502848273:web:92063fc62742c322e094b0",
  measurementId: "G-Y2018107EJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
