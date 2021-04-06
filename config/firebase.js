import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATLoCg7d0M95qPtZahSNTWaBgFwUdnkyE",
    authDomain: "whatsapp2-nextjs.firebaseapp.com",
    projectId: "whatsapp2-nextjs",
    storageBucket: "whatsapp2-nextjs.appspot.com",
    messagingSenderId: "569206648669",
    appId: "1:569206648669:web:bc0c44e735fe6611ae02b4",
    measurementId: "G-D5W9DETMM6"
};

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;