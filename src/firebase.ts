import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyC3SzSTgHzhAdh3eKrcrReaJETbY6--emM",
    authDomain: "my--app-4aa5e.firebaseapp.com",
    projectId: "my--app-4aa5e",
    storageBucket: "my--app-4aa5e.appspot.com",
    messagingSenderId: "1034371349272",
    appId: "1:1034371349272:web:ffb08261d01cd6ace83c6d",
    measurementId: "G-3YB19QRJ98"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;