import firebase from "firebase";

export const initializeFirebase = () => {
  let firebaseConfig = {};

  firebase.initializeApp(firebaseConfig);
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
