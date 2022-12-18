import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, get, child, set, onValue, orderByChild } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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
const user = auth.CurrentUser;
const lb = ref(db, "leaderboard");

//get leaderboard data from fb

//get leaderboard (can be put in FB Mgr)

//update leaderboard
function UpdateLB(){
    var lbList;
}