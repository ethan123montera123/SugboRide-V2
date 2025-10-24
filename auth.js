// Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6i6Dteqfk45ghsdzzBsLBMhnBtbtY8EA",
  authDomain: "sugboride.firebaseapp.com",
  databaseURL: "https://sugboride-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sugboride",
  storageBucket: "sugboride.firebasestorage.app",
  messagingSenderId: "104362918043",
  appId: "1:104362918043:web:19a07d398689f6aa61c63e",
  measurementId: "G-SW0TN1HJG1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Login with email
document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Logged in successfully!");
      console.log(userCredential.user);
      // Redirect or dashboard logic here
    })
    .catch((error) => alert(error.message));
});

// Signup with email
document.getElementById('signup-btn').addEventListener('click', () => {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Account created successfully!");
      console.log(userCredential.user);
      // You can save name and age to Firestore/Realtime DB here
    })
    .catch((error) => alert(error.message));
});

// Google Login / Signup
document.getElementById('google-login').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => alert("Logged in with Google!"))
    .catch((error) => alert(error.message));
});

document.getElementById('google-signup').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => alert("Signed up with Google!"))
    .catch((error) => alert(error.message));
});
