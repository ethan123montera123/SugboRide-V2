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
      console.log(userCredential.user);
      // Redirect to dashboard
      window.location.href = "dashboard.html";
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
      console.log(userCredential.user);
      // Save name and other info to Realtime Database if needed
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch((error) => alert(error.message));
});

// Google Login / Signup
document.getElementById('google-login').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      window.location.href = "dashboard.html";
    })
    .catch((error) => alert(error.message));
});

document.getElementById('google-signup').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      window.location.href = "dashboard.html";
    })
    .catch((error) => alert(error.message));
});
