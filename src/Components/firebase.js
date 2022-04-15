// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDsylRY5b2mNh_EBD2-_h4oXdFUuLlgLfY",
//   authDomain: "photoshare-b5275.firebaseapp.com",
//   projectId: "photoshare-b5275",
//   storageBucket: "photoshare-b5275.appspot.com",
//   messagingSenderId: "72605252420",
//   appId: "1:72605252420:web:0b723f17f7b77f0cb6f511"
// };

// // Use this to initialize the firebase App
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// // Use these for db & auth

// const storage = firebaseApp.firestore();
// const auth = firebase.auth();
// export { auth, storage };

import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDsylRY5b2mNh_EBD2-_h4oXdFUuLlgLfY",
//   authDomain: "photoshare-b5275.firebaseapp.com",
//   projectId: "photoshare-b5275",
//   storageBucket: "photoshare-b5275.appspot.com",
//   messagingSenderId: "72605252420",
//   appId: "1:72605252420:web:0b723f17f7b77f0cb6f511"
// };

// Initialize Firebase
const firebaseApp = initializeApp( {
  apiKey: "AIzaSyAZCLQe4HyJiLTMuyV9peRAgw2ukxZyGdI",
  authDomain: "social-media-app-cdac.firebaseapp.com",
  databaseURL: "https://social-media-app-cdac-default-rtdb.firebaseio.com",
  projectId: "social-media-app-cdac",
  storageBucket: "social-media-app-cdac.appspot.com",
  messagingSenderId: "755965045671",
  appId: "1:755965045671:web:e9ba46d5d16bdf6ce2e482",
  measurementId: "G-4TEC9J4HST"
  });

const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export {auth,storage};

