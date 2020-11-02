import firebase from 'firebase';
import 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB8IbFeonfSX74WzLkSNGo1Gqpdjrhzu9M",
    authDomain: "notesapp-48649.firebaseapp.com",
    databaseURL: "https://notesapp-48649.firebaseio.com",
    projectId: "notesapp-48649",
    storageBucket: "notesapp-48649.appspot.com",
    messagingSenderId: "476904484433",
    appId: "1:476904484433:web:2bbe45b7e48289cf375270"
  };
  // Initialize Firebase
  export const db = firebase.initializeApp(firebaseConfig).firestore();
