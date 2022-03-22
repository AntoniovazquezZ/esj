import firebase from 'firebase/app';

require('firebase/auth')
require('firebase/firestore')
require('firebase/storage')
require('firebase/functions')


var firebaseConfig = {
    apiKey: "AIzaSyBO4zYjrDFcD0Xu1u30CdRN0AhV6icG0EI",
    authDomain: "app-esj.firebaseapp.com",
    projectId: "app-esj",
    storageBucket: "app-esj.appspot.com",
    messagingSenderId: "246012813009",
    appId: "1:246012813009:web:723098fe6647ab4a856ff0",
    measurementId: "G-DXJ93KBK0G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()

export {
	firebase,
	auth,
	db,
	storage,
	functions
}