import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBJlbDBGJz0t38knm_kn59O-3dyPJK8RX0",
    authDomain: "code-hsu.firebaseapp.com",
    databaseURL: "https://code-hsu.firebaseio.com",
    projectId: "code-hsu",
    storageBucket: "code-hsu.appspot.com",
    messagingSenderId: "624102273414"
  };
firebase.initializeApp(config);

var storage = firebase.storage();
var db = firebase.firestore();
var auth = firebase.auth();

export {storage, db, auth};