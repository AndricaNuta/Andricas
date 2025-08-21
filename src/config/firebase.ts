import 'react-native-get-random-values';

import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAqxNZt0GEPcXw_oTmV_LzN44OpfcvTwEw',
  authDomain: 'andricas-showcase.firebaseapp.com',
  projectId: 'andricas-showcase',
  storageBucket: 'andricas-showcase.firebasestorage.app',
  messagingSenderId: '735048673622',
  appId: '1:735048673622:web:9bab4931b402e558844ef7',
  measurementId: 'G-S4HPWDEH8N',
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
