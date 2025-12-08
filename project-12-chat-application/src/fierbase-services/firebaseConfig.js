
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDhUtOSosCf6tIp-DSdS7p-1cPIqi-yG_w",
    authDomain: "chat-app-fd172.firebaseapp.com",
    projectId: "chat-app-fd172",
    storageBucket: "chat-app-fd172.firebasestorage.app",
    messagingSenderId: "149215743536",
    appId: "1:149215743536:web:5d9e8be0addc8f36d4a7f5",
    measurementId: "G-REHBF8MLGJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();