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

export async function connectFirebase() {
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

  // var firebaseConfig = {
  //   apiKey: "AIzaSyCN544TDH0yorLog8MeyX88S-ZWE_WlWPs",
  //   authDomain: "findlocal-67828.firebaseapp.com",
  //   projectId: "findlocal-67828",
  //   storageBucket: "findlocal-67828.appspot.com",
  //   messagingSenderId: "448032260439",
  //   appId: "1:448032260439:web:2963c9ae7c8871403a7e12",
  //   measurementId: "G-YHZW532X1W",
  // };

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyBPLHYxoCrRXXcK7H0ll-i0SC9W8HjRxSA",
        authDomain: "uplumber-61e0f.firebaseapp.com",
        projectId: "uplumber-61e0f",
        storageBucket: "uplumber-61e0f.appspot.com",
        messagingSenderId: "88339093684",
        appId: "1:88339093684:web:d49df4c3d8a6e36a49dfe1",
        measurementId: "G-4CYVYMWS46"
    };
  // Initialize Firebase
    if (!firebase.apps.length) {
        console.log("FIREBASE CONNECTED111111!!!");
        return firebase.initializeApp(firebaseConfig);
    }
}
