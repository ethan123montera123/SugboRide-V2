import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
    if (user) {
        userEmail.textContent = `Logged in as: ${user.email}`;
    } else {
        window.location.href = "index.html";
    }
});

logoutBtn.addEventListener("click", () => {
    signOut(auth)
        .then(() => window.location.href = "index.html")
        .catch(err => alert("Logout failed: " + err.message));
});
