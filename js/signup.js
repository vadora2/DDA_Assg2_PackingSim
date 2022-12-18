import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, get, child, set, onValue, orderByChild } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
//import {UpdatePlayerDisplayName} from "./firebase.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeG-pYB3UMHt6nCVK05_mlpYI-ZB4XeHg",
  authDomain: "dda-assg2-packingsim.firebaseapp.com",
  databaseURL: "https://dda-assg2-packingsim-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dda-assg2-packingsim",
  storageBucket: "dda-assg2-packingsim.appspot.com",
  messagingSenderId: "226734249363",
  appId: "1:226734249363:web:ac7880918d83ac41ba8466"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

//Working with Auth
const auth = getAuth();

////SIGN UP NEW USER
//retrieve element from form
let CreateUser = document.getElementById("frmCreateUser");

//we create a button listener to listen when someone clicks
CreateUser.addEventListener("submit", function (e) {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var displayname = document.getElementById("username").value;
  
  createUser(email, password, displayname);
  console.log("email" + email + "password" + password + "username" + displayname);
});

//create a new user based on email n password into Auth service
//user will get signed in
//userCredential is an object that gets
function createUser(email, password, displayname) {
  console.log("creating the user");

  createUserWithEmailAndPassword(auth, email, password, displayname)
    .then((userCredential) => {
      //signedin
      const user = userCredential.user;
      console.log("created user ... " + JSON.stringify(userCredential));
      console.log("User is now signed in ");

      //update display name
      //UpdatePlayerDisplayName();
      //console.log(displayname);

    var currentTimestamp = new Date().getTime();
    var playerData = {
      active: true,
      createdOn: currentTimestamp,
      email: email,
      lastLoggedIn: currentTimestamp,
      updatedOn: currentTimestamp,
      userName: displayname,
    };
    var playerStats = {
      createdOn: currentTimestamp,
      noOfMoneyEarned: 0,
      noOfboxDelivered: 0,
      updatedOn: currentTimestamp,
      userName: displayname,
    };
    var leaderboard = {
      noOfMoneyEarned: 0,
      noOfboxDelivered: 0,
      updatedOn: currentTimestamp,
      userName: displayname,
    };
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("The UID: " + uid)
        set(ref(db, `players/${uid}`), playerData);
        set(ref(db, `playerStats/${uid}`), playerStats);
        set(ref(db, `leaderboards/${uid}`), leaderboard);
      } else {
        // User is signed out
        // ...
      }
    });

      //change page
      setTimeout(() => {window.location.href="login.html"}, 1000);
      //window.location.href="login.html";

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
    });

    //onValue(playerRef, (snapshot) =>{
    //  updatePlayerContent(snapshot);
    //})
}

/*ValidatePassword.bool (password){
  isValid = false;
  
  if (password != "" && password.length >= 6){
    isValid =true
  }
}*/

