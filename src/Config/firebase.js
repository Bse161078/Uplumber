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
  var firebaseConfig = {
    //--------pido24 App config ids----------
    apiKey: "AIzaSyCZp9Q7UWuDGo9Zb1QSi0g7lcwtxlxgMGE",
    authDomain: "trof-3dad1.firebaseapp.com",
    databaseURL: "https://trof-3dad1.firebaseio.com",
    projectId: "trof-3dad1",
    storageBucket: "trof-3dad1.appspot.com",
    messagingSenderId: "429670046919",
    appId: "1:429670046919:web:054d12963db5ab7259b2e2",
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    console.log("FIREBASE CONNECTED!!!");
    return firebase.initializeApp(firebaseConfig);
  }
}
