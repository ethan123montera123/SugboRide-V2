// auth.js
// Firebase Config and Auth Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export auth so other files (like dashboard) can import
export { auth };

// ----------------------------
// Email & Password Login
// ----------------------------
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  });
}

// ----------------------------
// Email & Password Signup
// ----------------------------
const signupBtn = document.getElementById('signup-btn');
if (signupBtn) {
  signupBtn.addEventListener('click', () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        // Optionally, save the name to Realtime Database here
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  });
}

// ----------------------------
// Google Login / Signup
// ----------------------------
const googleLoginBtn = document.getElementById('google-login');
if (googleLoginBtn) {
  googleLoginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  });
}

const googleSignupBtn = document.getElementById('google-signup');
if (googleSignupBtn) {
  googleSignupBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  });
}

// ----------------------------
// Optional: Auth State Check
// ----------------------------
// Redirect to login page if user is not logged in
onAuthStateChanged(auth, (user) => {
  const isDashboard = window.location.pathname.includes("dashboard.html");
  if (!user && isDashboard) {
    window.location.href = "main.html";
  }
});
