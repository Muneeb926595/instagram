importScripts("https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDyUlONxJxM9vASxLhF7ca9H6kyJ7_WyIU",
  authDomain: "insta-redesign.firebaseapp.com",
  projectId: "insta-redesign",
  storageBucket: "insta-redesign.appspot.com",
  messagingSenderId: "815434317215",
  appId: "1:815434317215:web:d901fcc5e746fe04a491aa",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
