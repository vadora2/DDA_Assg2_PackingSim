import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, get, child, set, onValue, orderByChild } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7dk4QhzlkQkrQtDZXHtuxGk7NxOVZmWE",
  authDomain: "dda-assg1-stonkscapitalism.firebaseapp.com",
  databaseURL: "https://dda-assg1-stonkscapitalism-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dda-assg1-stonkscapitalism",
  storageBucket: "dda-assg1-stonkscapitalism.appspot.com",
  messagingSenderId: "1019153313241",
  appId: "1:1019153313241:web:5224515734b607629a7dc8",
  //measurementId: "G-G4ZG467EXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getDatabase();
const playerRef = ref(db, "playerStats");
getPlayerData();
function getPlayerData() {
  //const playerRef = ref(db, "players");
  //PlayerRef is declared at the top using a constant
  //get(child(db,`players/`))
  get(playerRef)
    .then((snapshot) => {//retrieve a snapshot of the data using a callback
      if (snapshot.exists()) {//if the data exist
        try {
          //let's do something about it
          var content = "";
          snapshot.forEach((childSnapshot) => {//looping through each snapshot
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array / forEach
            console.log("GetPlayerData: childkey " + childSnapshot.key);
            console.log(`Node : ${JSON.stringify(childSnapshot)}`);
            console.log(`Node Active: ${childSnapshot.child("active").val()}`);
          });
        } catch (error) {
          console.log("Error getPlayerData" + error);
        }
      }
    });
}//end getPlayerData


//Working with Auth
const auth = getAuth();
//retrieve element from form
var frmCreateUser = document.getElementById("frmCreateUser");
//we create a button listener to listen when someone clicks
frmCreateUser.addEventListener("submit", function(e) {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  createUser(email, password);
  console.log("email" + email + "password" + password);
});
//create a new user based on email n password into Auth service
//user will get signed in
//userCredential is an object that gets
function createUser(email, password) {
  console.log("creating the user");
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signedin
      const user = userCredential.user;
      console.log("created user ... " + JSON.stringify(userCredential));
      console.log("User is now signed in ");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
    });
}
/*
let student = {
  studentName: "Melvyn",
  grade: "A",
  class: "M03",
  marks: 100
}

console.log(student.class);

function Student(studentName, grade, className, marks) {
  this.studentName = studentName;
  this.grade = grade;
  this.class = className;
  this.marks = marks;
}
*/