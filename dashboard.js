import { auth } from "/js/firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
});

onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "index.html";
});
