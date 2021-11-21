import firebase, { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBcwiODv0e2A2YIiq7c4ve7heOraDnyChQ",
    authDomain: "ratefood-7997d.firebaseapp.com",
    projectId: "ratefood-7997d",
    storageBucket: "ratefood-7997d.appspot.com",
    messagingSenderId: "1021664339286",
    appId: "1:1021664339286:web:e859cd64fefdedf047e2f7"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);