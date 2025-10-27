// dashboard.js (module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase config (your existing config)
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

// init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// ui refs
const userEmailEl = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");
const progressBar = document.getElementById("progressBar");
const formStatus = document.getElementById("formStatus");
const afterComplete = document.getElementById("afterComplete");

// step elements
const steps = {
    1: document.getElementById("step1"),
    2: document.getElementById("step2"),
    3: document.getElementById("step3"),
    4: document.getElementById("step4")
};

let currentStep = 1;
const totalSteps = 4;

// inputs
const firstNameEl = document.getElementById("firstName");
const middleNameEl = document.getElementById("middleName");
const lastNameEl = document.getElementById("lastName");
const ageEl = document.getElementById("age");
const genderEl = document.getElementById("gender");
const addressEl = document.getElementById("address");

// review elements
const revName = document.getElementById("revName");
const revAge = document.getElementById("revAge");
const revGender = document.getElementById("revGender");
const revAddress = document.getElementById("revAddress");

// auth state
let currentUser = null;

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }
    currentUser = user;
    userEmailEl.textContent = `Logged in as: ${user.email}`;

    // check if profile already exists and completed
    try {
        const dbRef = ref(db);
        const snap = await get(child(dbRef, `users/${user.uid}/profile`));
        if (snap.exists()) {
            const data = snap.val();
            if (data.completed) {
                // show after complete state
                afterComplete.classList.remove("hidden");
                // optionally show profile summary
                revName.textContent = `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`;
                revAge.textContent = data.age;
                revGender.textContent = data.gender;
                revAddress.textContent = data.address;
                // hide form area
                document.getElementById("steps").classList.add("hidden");
            }
        }
    } catch (err) {
        console.error("DB read error:", err);
    }
});

// logout
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch(err => {
        alert("Logout failed: " + err.message);
    });
});

// navigation (next / prev)
document.addEventListener("click", (e) => {
    if (e.target.matches(".nextBtn")) {
        const next = Number(e.target.dataset.next);
        goToStep(next);
    } else if (e.target.matches(".prevBtn")) {
        const prev = Number(e.target.dataset.prev);
        goToStep(prev);
    }
});

function goToStep(step) {
    // simple validation before leaving certain steps
    if (step > currentStep) {
        // validate current
        if (!validateStep(currentStep)) return;
    }
    // show/hide forms
    for (let i = 1; i <= totalSteps; i++) {
        steps[i].classList.toggle("hidden", i !== step);
    }
    currentStep = step;
    updateProgress();
    if (currentStep === 4) populateReview();
}

function updateProgress() {
    const percent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);
    progressBar.style.width = `${percent}%`;
}

// step validations
function validateStep(step) {
    formStatus.textContent = "";
    if (step === 1) {
        if (!firstNameEl.value.trim()) { formStatus.textContent = "First name is required."; return false; }
        if (!lastNameEl.value.trim()) { formStatus.textContent = "Last name is required."; return false; }
    } else if (step === 2) {
        const ageVal = Number(ageEl.value);
        if (!ageVal || ageVal < 12) { formStatus.textContent = "Please enter a valid age (≥12)."; return false; }
        if (!genderEl.value) { formStatus.textContent = "Please select your gender."; return false; }
    } else if (step === 3) {
        if (!addressEl.value.trim()) { formStatus.textContent = "Please enter your address."; return false; }
    }
    return true;
}

function populateReview() {
    revName.textContent = `${firstNameEl.value.trim()} ${middleNameEl.value.trim() ? middleNameEl.value.trim() + " " : ""}${lastNameEl.value.trim()}`;
    revAge.textContent = ageEl.value;
    revGender.textContent = genderEl.value;
    revAddress.textContent = addressEl.value;
}

// Save profile to Realtime Database
const saveProfileBtn = document.getElementById("saveProfile");
saveProfileBtn.addEventListener("click", async () => {
    if (!validateStep(3)) {
        goToStep(3);
        return;
    }
    formStatus.textContent = "Saving profile…";
    saveProfileBtn.disabled = true;

    const profileData = {
        firstName: firstNameEl.value.trim(),
        middleName: middleNameEl.value.trim() || null,
        lastName: lastNameEl.value.trim(),
        age: Number(ageEl.value),
        gender: genderEl.value,
        address: addressEl.value.trim(),
        completed: true,
        updatedAt: Date.now()
    };

    try {
        await set(ref(db, `users/${currentUser.uid}/profile`), profileData);
        formStatus.textContent = "✅ Profile saved!";
        // Show proceed area and hide forms
        afterComplete.classList.remove("hidden");
        document.getElementById("steps").classList.add("hidden");
        // populate review fields (so user sees summary)
        revName.textContent = `${profileData.firstName} ${profileData.middleName ? profileData.middleName + ' ' : ''}${profileData.lastName}`;
        revAge.textContent = profileData.age;
        revGender.textContent = profileData.gender;
        revAddress.textContent = profileData.address;
    } catch (err) {
        console.error("Write failed", err);
        formStatus.textContent = "❌ Save failed: " + err.message;
    } finally {
        saveProfileBtn.disabled = false;
    }
});

// initialize progress
updateProgress();
