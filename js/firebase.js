// Import des modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDB71_Wg-_dgyNz2Z7kKIGEBEvA-r6jIoM",
  authDomain: "retouche-photo-pro.firebaseapp.com",
  projectId: "retouche-photo-pro",
  storageBucket: "retouche-photo-pro.firebasestorage.app",
  messagingSenderId: "872913749251",
  appId: "1:872913749251:web:9dbd1bdf4dca1335031536",
  measurementId: "G-RHG0NZEE6Y"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export des services
export { app, auth, db, storage };