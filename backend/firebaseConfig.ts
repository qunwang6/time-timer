import firebase from "firebase/app";
import "firebase/storage";

export const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  // projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FB_APP_ID,

  apiKey: "AIzaSyDA1FAe9_b6ts2uPDMxUtlxHCuWGmH75L0",
  projectId: "timer-ce84d",
  storageBucket: "timer-ce84d.appspot.com",
  messagingSenderId: "309616404237",
  appId: "1:309616404237:web:6888844716e7c6e294b244",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const fbStorage = firebase.storage();
