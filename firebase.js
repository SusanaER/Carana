// Import firebase
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration, you have to paste here the object that comes from firebase

const firebaseConfig = {
    apiKey: "AIzaSyCqnH-YLTCBPleNt6s8obT4UFGBjGOYeIc",

    authDomain: "proyectou3dmi-59660.firebaseapp.com",

    projectId: "proyectou3dmi-59660",

    storageBucket: "proyectou3dmi-59660.appspot.com",

    messagingSenderId: "57902288280",

    appId: "1:57902288280:web:390e25a5e5522aa8012fed"
};

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage().ref();
const database = firebase.database();
//const firestore = firebase.firestore();

export { auth, database, firebase, storage };