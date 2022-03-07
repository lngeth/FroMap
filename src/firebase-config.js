// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: "pwebc-ce0a0.firebaseapp.com",
    databaseURL: "https://pwebc-ce0a0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pwebc-ce0a0",
    storageBucket: "pwebc-ce0a0.appspot.com",
    messagingSenderId: "570864478828",
    appId: "1:570864478828:web:b57b7a4c18e9433855c649",
    measurementId: "G-NF54VR3MDE"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default {firebaseApp, db}