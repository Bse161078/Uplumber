import { initializeApp } from 'firebase/app';
import firebase from "firebase";

// let firebaseConfig = {
//   apiKey: "AIzaSyBVJIb6UcJoYektdU9FctkCN2DSWK4EVP8",
//   authDomain: "easy-36534.firebaseapp.com",
//   databaseURL: "https://easy-36534.firebaseio.com",
//   projectId: "easy-36534",
//   storageBucket: "easy-36534.appspot.com",
//   messagingSenderId: "719599948280",
//   appId: "1:719599948280:web:dce5a572f35621d737460d",
//   measurementId: "G-K6NRRLW2WC",
// };

// var firebaseConfig = {
//   //--------pido24 App config ids----------
//   apiKey: "AIzaSyCZp9Q7UWuDGo9Zb1QSi0g7lcwtxlxgMGE",
//   authDomain: "trof-3dad1.firebaseapp.com",
//   databaseURL: "https://trof-3dad1.firebaseio.com",
//   projectId: "trof-3dad1",
//   storageBucket: "trof-3dad1.appspot.com",
//   messagingSenderId: "429670046919",
//   appId: "1:429670046919:web:054d12963db5ab7259b2e2",
// };

// let fire = firebase.initializeApp(firebaseConfig);

// export default fire;

// export async function connectFirebase() {
//   // var firebaseConfig = {
//   //   //--------pido24 App config ids----------
//   //   apiKey: "AIzaSyCZp9Q7UWuDGo9Zb1QSi0g7lcwtxlxgMGE",
//   //   authDomain: "trof-3dad1.firebaseapp.com",
//   //   databaseURL: "https://trof-3dad1.firebaseio.com",
//   //   projectId: "trof-3dad1",
//   //   storageBucket: "trof-3dad1.appspot.com",
//   //   messagingSenderId: "429670046919",
//   //   appId: "1:429670046919:web:054d12963db5ab7259b2e2",
//   // };

//   // var firebaseConfig = {
//   //   apiKey: "AIzaSyCN544TDH0yorLog8MeyX88S-ZWE_WlWPs",
//   //   authDomain: "findlocal-67828.firebaseapp.com",
//   //   projectId: "findlocal-67828",
//   //   storageBucket: "findlocal-67828.appspot.com",
//   //   messagingSenderId: "448032260439",
//   //   appId: "1:448032260439:web:2963c9ae7c8871403a7e12",
//   //   measurementId: "G-YHZW532X1W",
//   // };

//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyAPDoekF3spw79qd_W8PCZUrGuYsoXVY60",
//     authDomain: "uplumberpro.firebaseapp.com",
//     projectId: "uplumberpro",
//     storageBucket: "uplumberpro.appspot.com",
//     messagingSenderId: "199907760127",
//     appId: "1:199907760127:web:bae9245c753dd03751f9ca",
//     measurementId: "G-RL5BNGG753"
//   };
//   // Initialize Firebase
//   if (!firebase.apps.length) {
//     console.log("FIREBASE CONNECTED111111!!!");
//     return firebase.initializeApp(firebaseConfig);
//   }
// }
// export const onMessageListener = () =>

//   new Promise((resolve) => {
//     firebase.messaging().onMessage((payload) => {
//       resolve(payload);
//     });
//   });

const firebaseProduction = {
  apiKey: "AIzaSyAPDoekF3spw79qd_W8PCZUrGuYsoXVY60",
  authDomain: "uplumberpro.firebaseapp.com",
  projectId: "uplumberpro",
  storageBucket: "uplumberpro.appspot.com",
  messagingSenderId: "199907760127",
  appId: "1:199907760127:web:bae9245c753dd03751f9ca",
  measurementId: "G-RL5BNGG753"
};

const firebaseDevelopment = {
  apiKey: "AIzaSyAPDoekF3spw79qd_W8PCZUrGuYsoXVY60",
  authDomain: "uplumberpro.firebaseapp.com",
  projectId: "uplumberpro",
  storageBucket: "uplumberpro.appspot.com",
  messagingSenderId: "199907760127",
  appId: "1:199907760127:web:bae9245c753dd03751f9ca",
  measurementId: "G-RL5BNGG753"
  // apiKey: "AIzaSyBrshw3BEyicE6-xnxvjy6xzB_JMe3kPGs",
  // projectId: "gift-me-that",
  // authDomain: "giftmethat.io",
  // storageBucket: "gift-me-that.appspot.com",
  // messagingSenderId: "115552501434",
  // appId: "1:115552501434:web:09e20056161c91d3fa4c83",
  // measurementId: "G-WV19D5RD7J"
};

// Initialize Firebase
firebase.initializeApp(
  process.env.REACT_APP_ENVIRONMENT === "development"
    ? firebaseDevelopment
    : firebaseProduction
);
firebase.analytics();

const storage = firebase.storage();

export { firebase, storage };
