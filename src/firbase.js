import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD5ofs6lZqObeHh54lNK0EmH-xYR6lF7n4",
    authDomain: "ecommerce-a111a.firebaseapp.com",
    projectId: "ecommerce-a111a",
    storageBucket: "ecommerce-a111a.appspot.com",
    messagingSenderId: "499606904729",
    appId: "1:499606904729:web:13f3cee05da38d14923d08"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth=firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();