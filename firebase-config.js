import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const statusMessage = document.getElementById("statusMessage");

// LOGIN
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Login successful immediately (no verification)
        statusMessage.textContent = "✅ Login successful!";
        setTimeout(() => (window.location.href = "dashboard.html"), 1000);
    } catch (err) {
        statusMessage.textContent = "❌ " + err.message;
    }
});

// SIGNUP
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Direct login after signup
        statusMessage.textContent = "✅ Signup successful! Redirecting...";
        setTimeout(() => (window.location.href = "dashboard.html"), 1000);

    } catch (err) {
        console.error("Signup error:", err);
        statusMessage.textContent = "❌ " + err.message;
    }
});

// AUTO LOGIN CHECK
onAuthStateChanged(auth, (user) => {
    if (user && !window.location.href.includes("dashboard.html")) {
        window.location.href = "dashboard.html";
    }
});
