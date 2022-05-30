importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBtN5Mm8P2N3GMbkNLyP6aWB-W5s7AJjQU",
    authDomain: "sfaecommerce-pushnotifications.firebaseapp.com",
    projectId: "sfaecommerce-pushnotifications",
    storageBucket: "sfaecommerce-pushnotifications.appspot.com",
    messagingSenderId: "856057949312",
    appId: "1:856057949312:web:35e712422a449545fa0a65",
    measurementId: "G-PCZHKCSXE6"
});
const messaging = firebase.messaging();
