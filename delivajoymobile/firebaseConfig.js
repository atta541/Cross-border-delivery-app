import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFunctions } from 'firebase/functions'; 

const firebaseConfig = {
  apiKey: "AIzaSyDvFndRijNdjExZCRe7RbgBobq962FU3kI",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "delivajoymobile-7c40c",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:38106251938:android:f642bd7798584cdfaf0dfb",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const functions = getFunctions(app); 

export { app, database, functions }; 
