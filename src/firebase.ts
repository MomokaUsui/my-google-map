import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { FIREBASE_API_KEY, MY_APP_ID, MY_AUTH_DOMAIN, MY_MEASUREMENT_ID, MY_MESSAGEING_SENDER_ID, MY_PROJECT_ID, MY_STORAGE_BUCKET } from "./config";

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: MY_AUTH_DOMAIN,
    projectId: MY_PROJECT_ID,
    storageBucket: MY_STORAGE_BUCKET,
    messagingSenderId: MY_MESSAGEING_SENDER_ID,
    appId: MY_APP_ID,
    measurementId: MY_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;