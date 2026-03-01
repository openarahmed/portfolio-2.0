import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // dashboard login er jonno lagbe
import { getStorage } from "firebase/storage"; // ✅ Storage ইমপোর্ট করা হলো

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (Next.js এর হট-রিলোড এরর এড়ানোর জন্য এই চেকটা দেওয়া হলো)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // ✅ Storage এক্সপোর্ট করা হলো
