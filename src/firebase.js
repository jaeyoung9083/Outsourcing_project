import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCdbrciFLFyrYB-OfGP_nEXRVI6gCSUMHg',
  authDomain: 'outsourcingproject.firebaseapp.com',
  projectId: 'outsourcingproject',
  storageBucket: 'outsourcingproject.appspot.com',
  messagingSenderId: '298224344576',
  appId: '1:298224344576:web:64f9275760312d717942e5'
};
//로컬파일에 있는 env를 개인정보를 유출이 안되게 불러온다.
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// REACT_APP_FB_API_KEY="AIzaSyCdbrciFLFyrYB-OfGP_nEXRVI6gCSUMHg"
// REACT_APP_FB_AUTH_DOMAIN="outsourcingproject.firebaseapp.com"
// REACT_APP_PROJECT_ID="outsourcingproject"
// REACT_APP_STORAGE_BUCKET="outsourcingproject.appspot.com"
// REACT_APP_MESSAGING_SENDER_ID="298224344576"
// REACT_APP_APP_ID="1:298224344576:web:64f9275760312d717942e5"
