import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'urban-property-app.firebaseapp.com',
  projectId: 'urban-property-app',
  storageBucket: 'urban-property-app.appspot.com',
  messagingSenderId: 646991051164,
  appId: '1:646991051164:web:fd3acab2def6c42f2b7059',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
