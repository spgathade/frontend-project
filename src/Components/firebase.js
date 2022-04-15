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
  apiKey: "AIzaSyB4EjSqZz_kjiZhG7kAZOnWjLit0-UH_40",
  authDomain: "instaclone-e881b.firebaseapp.com",
  projectId: "instaclone-e881b",
  storageBucket: "instaclone-e881b.appspot.com",
  messagingSenderId: "179627903539",
  appId: "1:179627903539:web:00c572c4b885092b9e7146",

  });

const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export {auth,storage};

