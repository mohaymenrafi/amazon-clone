import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: 'AIzaSyBn0ywSf0gDWvQ_q8owpszV1BUoYC5BkIk',
  authDomain: 'amzan-2.firebaseapp.com',
  projectId: 'amzan-2',
  storageBucket: 'amzan-2.appspot.com',
  messagingSenderId: '989926674398',
  appId: '1:989926674398:web:efcec3998e5e0581ab974f',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
// export const db = getFirestore(app);
