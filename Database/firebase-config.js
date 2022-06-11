// //import database from firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// Firebase config
// //---------------------- FIREBASE CONFIG ----------------------------
const firebaseConfig = {
  apiKey: "AIzaSyA4UGBnTF9NoV8wdJGBxnGjzT-cGhHZ_ek",
  authDomain: "mai-center-2f998.firebaseapp.com",
  databaseURL:
    "https://mai-center-2f998-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mai-center-2f998",
  storageBucket: "mai-center-2f998.appspot.com",
  messagingSenderId: "321131168017",
  appId: "1:321131168017:web:9235a1e22aa0a671bdccb0",
  measurementId: "G-R2Q978QTT3",
};

//---------------------- FIREBASE CONFIG ----------------------------

//--------------EXPORT REALTIME DATABASE ---------------------
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);

//--------------EXPORT REALTIME DATABASE ---------------------
