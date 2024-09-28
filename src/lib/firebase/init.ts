// lib/firebase.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection} from 'firebase/firestore';
import {ref, uploadBytesResumable,getStorage, getDownloadURL} from 'firebase/storage'
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration (use .env.local for environment variables)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string
};

// Initialize Firebase app and Firestore
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage
const auth = getAuth(app);

export { db, storage,auth }; // Export Firestore and Storage instances

