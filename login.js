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






// const user = auth.currentUser;
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         getDoc(doc(db, "users", user.uid)).then(docSnap => {
//             if (docSnap.exists()) {
//                 let userdata = docSnap.data();
//                 console.log(userdata);
//                 username.innerText = `Welcome, ${userdata.fullName}`;
//                 Gmail.innerHTML = `<b>Email:</b> ${userdata.email}`;

//                 // Display Wishlist
//                 let Wishlist = userdata.wishlist || [];
//                 console.log(Wishlist);
//                 displayWishlist.innerHTML = "";
//                 Wishlist.forEach((item, index) => {
//                     let ele = document.createElement("h3");
//                     ele.innerText = `${index + 1}. ${item}`;
//                     displayWishlist.append(ele);
//                 });
//             } else {
//                 console.log("No data found");
//             }
//         });
//     } else {
//         // User is signed out
//         window.open("index.html", "_self");
//     }
// });

// // Logout functionality
// let logout = document.getElementById("logout");
// logout.addEventListener("click", () => {
//     signOut(auth).then(() => {
//         window.open("index.html", "_self");
//     }).catch((error) => {
//         alert(error.message);
//     });
// });

// // Add to Wishlist
// let addToWishlistBtn = document.getElementById("add-to-wishlist-btn");
// addToWishlistBtn.addEventListener("click", () => {
//     addToWishlist();
// });
// let wishlistInput = document.getElementById("wishlist-input");
// wishlistInput.addEventListener("keypress", async (e) => {
//     if (e.key === "Enter") {
//         addToWishlist();
//     }
// });

// async function addToWishlist() {
//     let item = document.getElementById("wishlist-input").value.trim();
//     if (!item) return;

//     const user = auth.currentUser;
//     let localWishlist = [];

//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             getDoc(doc(db, "users", user.uid)).then(docSnap => {
//                 if (docSnap.exists()) {
//                     let userdata = docSnap.data();
//                     localWishlist = userdata.wishlist || [];

//                     if (!localWishlist.includes(item)) {
//                         localWishlist.push(item);

//                         updateDoc(doc(db, "users", user.uid), {
//                             wishlist: localWishlist
//                         }).then(() => {
//                             console.log("Wishlist updated successfully.");
//                             displayWishlist.innerHTML = "";
//                             localWishlist.forEach((item, index) => {
//                                 let ele = document.createElement("h3");
//                                 ele.innerText = `${index + 1}. ${item}`;
//                                 displayWishlist.append(ele);
//                             });
//                         }).catch(error => {
//                             console.error("Error updating wishlist: ", error);
//                         });
//                     }
//                 }
//             }).catch(error => {
//                 console.error("Error fetching document: ", error);
//             });
//         }
//     });
// }
