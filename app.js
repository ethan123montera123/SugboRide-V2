// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase config
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
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Toast utility
const showToast = (msg, color = "bg-white") => {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = `${color} text-gray-800 px-4 py-2 rounded shadow-lg fixed bottom-6 left-6 animate-fade`;
    toast.style.display = "block";
    setTimeout(() => (toast.style.display = "none"), 3000);
};

// Handle Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            showToast("Account created successfully!", "bg-green-400");
            setTimeout(() => (window.location = "index.html"), 1500);
        } catch (err) {
            showToast(err.message, "bg-rose-400");
        }
    });
}

// Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            showToast("Login successful!", "bg-green-400");
            setTimeout(() => (window.location = "dashboard.html"), 1500);
        } catch (err) {
            showToast("Invalid credentials", "bg-rose-400");
        }
    });
}
