// Importurile necesare
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configurația Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBMn18-77_YVXpFs1yZEbG8jWL7dDIqjUE',
  authDomain: 'greenchain-auth.firebaseapp.com',
  projectId: 'greenchain-auth',
  storageBucket: 'greenchain-auth.appspot.com',
  messagingSenderId: '896289313512',
  appId: '1:896289313512:web:4ee8ff6cb3b27150032f5d',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
