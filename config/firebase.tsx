// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getPerformance } from 'firebase/performance';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'YOUR_FIREBASE_API_KEY',
   appId: 'YOUR_FIREBASE_APP_ID',
   authDomain: 'YOUR_FIREBASE_AUTH_DOMAIN',
   measurementId: 'YOUR_FIREBASE_MEASUREMENT_ID',
   messagingSenderId: 'YOUR_FIREBASE_MESSAGING_SENDER_ID',
   projectId: 'YOUR_FIREBASE_PROJECT_ID',
   storageBucket: 'YOUR_FIREBASE_STORAGE_BUCKET',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getDatabase();
const perf = getPerformance(app);

// To run against local firebase environment for development
if (__DEV__) {
   console.log('127.0.0.1 detected!');
   connectAuthEmulator(auth, 'http://127.0.0.1:9099');
   connectDatabaseEmulator(db, '127.0.0.1', 8080);
}

export default app;
