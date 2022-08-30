import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAwv1vMipwaDkgVaKkh1WA1xHeGekmIpOk",
    authDomain: "spark-worship.firebaseapp.com",
    databaseURL: "https://spark-worship-default-rtdb.firebaseio.com",
    projectId: "spark-worship",
    storageBucket: "spark-worship.appspot.com",
    messagingSenderId: "600327734384",
    appId: "1:600327734384:web:b48ad8d41982dbaf35a0b5",
    measurementId: "G-HMX8YV3XF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const auth = getAuth(app);