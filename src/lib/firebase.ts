'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-4051962358-11eb3',
  appId: '1:721381625627:web:39b354f12d65b4d2798dbe',
  apiKey: 'AIzaSyDInBlgkMkRMx-XGqBugzjBgXmds7cgRWQ',
  authDomain: 'studio-4051962358-11eb3.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '721381625627',
  storageBucket: "studio-4051962358-11eb3.appspot.com",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
