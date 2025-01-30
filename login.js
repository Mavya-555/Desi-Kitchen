import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, setDoc, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getAuth(app);
const auth = getAuth();

// Log Out Button 
document.getElementById("logout").addEventListener("click", () => {
    // Clear session storage (for preventing navigations)
    sessionStorage.removeItem("authUser");

    // Redirect to login page and replace current history entry
    window.location.replace("./login.html");
});



const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if(user){
        getDoc (doc(db,"users",user.uid)).then(docSnap => {
            if(docSnap.exists()){
                let userdata = docSnap.data();
                console.log(userdata);
                username.innerText=`Welcome, ${userdata.fullName}`
                fullName.innerHTML=`<b>FullName:</b> ${userdata.fullName}`
            }
        })
    }
})
