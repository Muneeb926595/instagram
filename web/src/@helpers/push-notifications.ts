import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDyUlONxJxM9vASxLhF7ca9H6kyJ7_WyIU",
  authDomain: "insta-redesign.firebaseapp.com",
  projectId: "insta-redesign",
  storageBucket: "insta-redesign.appspot.com",
  messagingSenderId: "815434317215",
  appId: "1:815434317215:web:d901fcc5e746fe04a491aa",
};

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();

    return token;
  } catch (error) {
    console.error(error);
  }
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
