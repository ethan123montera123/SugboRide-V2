// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

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

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
