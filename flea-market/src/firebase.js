// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDr5fl8k596KVWrnid1Zd4WjR6u-97AQtQ",
    authDomain: "webproject-3facc.firebaseapp.com",
    projectId: "webproject-3facc",
    storageBucket: "webproject-3facc.appspot.com",
    messagingSenderId: "451256627361",
    appId: "1:451256627361:web:d7d0e4eba274ce7bfa00e0",
    measurementId: "G-ZM2P5ZCLBF"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const realtimedb = firebaseApp.database();

const storage = firebaseApp.storage();

export {firebaseApp};