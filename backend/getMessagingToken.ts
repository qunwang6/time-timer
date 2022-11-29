import firebase from "firebase/app";
import "firebase/messaging";

export async function getMessagingToken() {
  const messaging = firebase.messaging();

  console.log("#1 messaging obj: ", messaging);

  // const token = await messaging.getToken({
  //   vapidKey: process.env.NEXT_PUBLIC_FB_MESSAGING_KEY,
  // });

  const token = "fake!";
  messaging
    .getToken({ vapidKey: process.env.NEXT_PUBLIC_FB_MESSAGING_KEY })
    .then((token) => {
      console.log("real token: ", token);
    });

  console.log("#2 messaging token: ", token);

  return token;
}