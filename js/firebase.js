import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, get, child, set, onValue, orderByChild } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
//import {email, password, displayname} from "./signin";
//import {email, password, displayname} from "./signup";

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
const user = auth.CurrentUser;
const playerRef = ref(db, "players");
const playerStats = ref(db, "playerStats");
const lb = ref(db, "leaderboard");

//Retrieve from login
var myData = sessionStorage.getItem('UUID');
console.log("this is my data " + myData);

//[STEP 3] Setup our event listener
//var readBtn = document
  //.getElementById("btn-read")
  //.addEventListener("click", getPlayerData);
  //get Leaderboard
  
  var limit = 5;

  GetLB(limit);
  function GetLB(limit){
    q = get(lb).then(orderByChild("noOfMoneyEarned").LimitToLast(limit));
    lbList=[];
  
    get(q).then((snapshot) => { //retrieve a snapshot of the data using a callback
      if (snapshot.exists()) {
        //if the data exist
  
        try {
          //let's do something about it
          
  
          snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot);
            //looping through each snapshot
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
            //console.log("User key:" + childSnapshot.key);
            //console.log("Username:" + childSnapshot.child("userName").val());
            //console.log(`compare ${childSnapshot.key}:SUbyQ9LeZjb2MzjIKIC7wEWvxLW2`)
  
            let userKey = (childSnapshot.key).trim();
  
            if (userKey == myData) {
  
            }
          });
          
          
        } catch (error) {
          console.log("Error getPlayerData" + error);
        }
      }
      else {
        //@TODO what if no data ?
      }
    });
  }
  
getPlayerData(limit = 5);
function getPlayerData(e) {
  //const playerRef = ref(db, "players");
  //PlayerRef is declared at the top using a constant
  //get(child(db,`players/`))

  //e.preventDefault();
  //playerRef is declared at the top using a constant
  //const playerRef = ref(db, "players");
  //get(child(db,`players/`))
  /*get(playerRef).then((snapshot) => { //retrieve a snapshot of the data using a callback
    if (snapshot.exists()) {
      //if the data exist
      try {
        //let's do something about it
        var playerContent = document.getElementById("player-content");
        var content = "";
        snapshot.forEach((childSnapshot) => {
          //looping through each snapshot
          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
          //console.log("User key:" + childSnapshot.key);
          //console.log("Username:" + childSnapshot.child("userName").val());
          //console.log(`compare ${childSnapshot.key}:SUbyQ9LeZjb2MzjIKIC7wEWvxLW2`)
          let userKey = (childSnapshot.key).trim();
          if (userKey == myData) {
            console.log(`username found: ${childSnapshot.child("displayName").val()}`);
            content += `<p class = "name">
            ${childSnapshot.child("displayName").val()}
            </p>`;

          }
        });
        //update our table content
        playerContent.innerHTML = content;
      } catch (error) {
        console.log("Error getPlayerData" + error);
      }
    }
    else {
      //@TODO what if no data ?
    }
  });*/

  ///PLAYER STATS
  get(playerStats).then((snapshot) => { //retrieve a snapshot of the data using a callback
    if (snapshot.exists()) {
      //if the data exist
      
      try {
        //let's do something about it
        var playerName = document.getElementById("userName");
        var playerNamecontent = "";

        var displayName = document.getElementById("player-content");
        var content ="";

        var highestScore = document.getElementById("noOfboxDelivered");
        var highestScorecontent = "";

        var boxesDelivered = document.getElementById("noOfMoneyEarned");
        var boxesDeliveredcontent = "";

        snapshot.forEach((childSnapshot) => {
          //looping through each snapshot
          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
          //console.log("User key:" + childSnapshot.key);
          //console.log("Username:" + childSnapshot.child("userName").val());
          //console.log(`compare ${childSnapshot.key}:SUbyQ9LeZjb2MzjIKIC7wEWvxLW2`)

          let userKey = (childSnapshot.key).trim();

          if (userKey == myData) {

            ////display name
            console.log(`username found: ${childSnapshot.child("userName").val()}`);

            //adding data into 'content'
            playerNamecontent += `<td id="userName">
            ${childSnapshot.child("userName").val()}
            </td>`;

            //adding name to display name
            content += `<p class = "username">
            ${childSnapshot.child("userName").val()}
            </p>`;

            
            ////highest score
            console.log(`no. boxes delivered found: ${childSnapshot.child("noOfboxDelivered").val()}`);

            //adding data into 'content'
            highestScorecontent += `<td id="noOfboxDelivered">
            ${childSnapshot.child("noOfboxDelivered").val()}
            </td>`;
            
            //update our table content
            //highestScore.innerHTML = content;
            
            
            ////boxes delivered
            console.log(`highest money earned found: ${childSnapshot.child("noOfMoneyEarned").val()}`);
            
            //adding data into 'content'
            boxesDeliveredcontent += `<td id="noOfMoneyEarned">
            ${childSnapshot.child("noOfMoneyEarned").val()}
            </td>`;
            
            //update our table content
            //boxesDelivered.innerHTML = content;
          }
        });
        
        //update our table content
        playerName.innerHTML = playerNamecontent;
        highestScore.innerHTML = highestScorecontent;
        boxesDelivered.innerHTML = boxesDeliveredcontent;

        //update our displayname content
        displayName.innerHTML = content;
        
      } catch (error) {
        console.log("Error getPlayerData" + error);
      }
    }
    else {
      //@TODO what if no data ?
    }
  });
  
  /* OLD ONE
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
 */
}//end getPlayerData

// update current user
function GetCurrentUser(){
  return user;
}

function LogOut(){
  sessionStorage.clear();
}

/*
export function UpdatePlayerDisplayName(displayname){
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const uid = user.uid;
      const displayname = user.displayName;
      console.log("Firebase.js in index.html: " + displayname);
      //document.getElementById("username").innerHTML = displayname;
    
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      var myData = sessionStorage.getItem('UUID');
      console.log(myData);
      
    }
  });
}
*/

