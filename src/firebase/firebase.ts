import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3HMlAvRC_vG0Lu1K1HekaWxi4hk0Z89s",
  authDomain: "doge-sokoban.firebaseapp.com",
  databaseURL: "https://doge-sokoban.firebaseio.com",
  projectId: "doge-sokoban",
  storageBucket: "doge-sokoban.appspot.com",
  messagingSenderId: "195924359293",
  appId: "1:195924359293:web:2fe0b39efa83b208359914",
  measurementId: "G-QY8500SPWF"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp;
