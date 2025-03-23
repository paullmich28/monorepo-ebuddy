import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import admin from "firebase-admin"
import { getAuth } from "firebase-admin/auth"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

const serviceAccount = require("../serviceAccount.json");

export const authToken = getAuth(admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
}))