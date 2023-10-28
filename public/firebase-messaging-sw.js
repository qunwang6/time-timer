importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

/*
These keys are secured by firebase security rules
*/
firebase.initializeApp({
  apiKey: "AIzaSyDA1FAe9_b6ts2uPDMxUtlxHCuWGmH75L0",
  projectId: "timer-ce84d",
  storageBucket: "timer-ce84d.appspot.com",
  messagingSenderId: "309616404237",
  appId: "1:309616404237:web:6888844716e7c6e294b244",
});

const messaging = firebase.messaging();
