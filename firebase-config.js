import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
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

        if (user.emailVerified) {
            statusMessage.textContent = "✅ Login successful!";
            setTimeout(() => (window.location.href = "dashboard.html"), 1000);
        } else {
            await signOut(auth);
            statusMessage.textContent = "⚠️ Please verify your email first. Check your inbox.";
        }
    } catch (err) {
        statusMessage.textContent = "❌ " + err.message;
    }
});

// SIGNUP + EMAIL VERIFICATION
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Force redirect link back to your domain
        const actionCodeSettings = {
            url: window.location.origin + "/index.html",
            handleCodeInApp: false
        };

        await sendEmailVerification(user, actionCodeSettings);
        statusMessage.textContent = "📩 Verification email sent! Please check your inbox (or spam).";

        // Logout until verified
        await signOut(auth);
    } catch (err) {
        console.error("Error sending verification:", err);
        statusMessage.textContent = "❌ " + err.message;
    }
});

// AUTO LOGIN CHECK
onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified && !window.location.href.includes("dashboard.html")) {
        window.location.href = "dashboard.html";
    }
});
