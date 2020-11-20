import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyBUxxiOCEUTokI-SW1kTwmGGcehFXiH3BE',
  authDomain: 'unihack-2020.firebaseapp.com',
  databaseURL: 'https://unihack-2020.firebaseio.com',
  projectId: 'unihack-2020',
  storageBucket: 'unihack-2020.appspot.com',
  messagingSenderId: '558755394027',
  appId: '1:558755394027:web:eb1246ce8bd1a8706869ae',
  measurementId: 'G-JFWWWJ73P2',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const projectStorage = firebase.storage();
export const projectFirestore = firebase.firestore();
export const projectAuth = firebase.auth();
export const projectDatabase = firebase.database();
export const projectFunctions = firebase.functions();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
