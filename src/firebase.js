// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDpotl-vGVkMJdDKgknOGpIQKVkO3qYWcw',
  authDomain: 'inventory-management-41d20.firebaseapp.com',
  projectId: 'inventory-management-41d20',
  storageBucket: 'inventory-management-41d20.appspot.com',
  messagingSenderId: '329154836909',
  appId: '1:329154836909:web:81d1c6ec637afed2ad4924',
  measurementId: 'G-JS64EW2LS5'
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { firestore, auth, storage };
