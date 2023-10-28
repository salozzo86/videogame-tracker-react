// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBLW0xQBMO8mLrJd-wGhYjzSVCVwzZxPu4',
  authDomain: 'react-http-f4cc2.firebaseapp.com',
  databaseURL:
    'https://react-http-f4cc2-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-http-f4cc2',
  storageBucket: 'react-http-f4cc2.appspot.com',
  messagingSenderId: '846752016619',
  appId: '1:846752016619:web:fb9b851a13df285d11b6ae',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export db
export const db = getDatabase(app);
