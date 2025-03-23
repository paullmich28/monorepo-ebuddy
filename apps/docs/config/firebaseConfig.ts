import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import admin from "firebase-admin"
import { getAuth } from "firebase-admin/auth"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "ebuddy-test-62592",
  storageBucket: "ebuddy-test-62592.firebasestorage.app",
  messagingSenderId: "626192657963",
  appId: "1:626192657963:web:6fb884ce46529235f6c46e",
  measurementId: "G-NX6QTKEK0Y",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

const serviceAccount = require("../serviceAccount.json");

export const authToken = getAuth(admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
}))