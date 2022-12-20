import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, get, child, set, update, push, onValue, orderByChild} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
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
const leaderboard = ref(db, "leaderboards");

//Retrieve from login
var myData = sessionStorage.getItem('UUID');
console.log("this is my data in firebase: " + myData);

//[STEP 3] Setup our event listener
var limit = 1;

let deletePlayerStat = document.getElementById("deleteData");
deletePlayerStat.addEventListener("click",  UpdatePlayerStats);
 
//UpdatePlayerStats();

function UpdatePlayerStats(){
  console.log("Deleting you statistic")

  update(ref(db, "playerStats/" + myData),{
      noOfMoneyEarned: 0,
      noOfboxDelivered: 0
  });
  update(ref(db, "leaderboards/" + myData),{
    noOfMoneyEarned: 0,
    noOfboxDelivered: 0
  });
  setTimeout(() => {window.location.href="index.html"}, 1000);
}

getPlayerData(limit = 1);
function getPlayerData() {
  //const playerRef = ref(db, "players");
  //PlayerRef is declared at the top using a constant
  //get(child(db,`players/`))

  //e.preventDefault();
  //playerRef is declared at the top using a constant
  //const playerRef = ref(db, "players");
  //get(child(db,`players/`))
  get(playerRef).then((snapshot) => { //retrieve a snapshot of the data using a callback
    if (snapshot.exists()) {
      //if the data exist
      try {
        //let's do something about it
        var playerUsername = document.getElementById("playerUserName");
        var content = "";
        snapshot.forEach((childSnapshot) => {
          //looping through each snapshot
          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
          //console.log("User key:" + childSnapshot.key);
          //console.log("Username:" + childSnapshot.child("userName").val());
          //console.log(`compare ${childSnapshot.key}:SUbyQ9LeZjb2MzjIKIC7wEWvxLW2`)
          let userKey = (childSnapshot.key).trim();
          if (userKey == myData) {
            console.log(`username of player found: ${childSnapshot.child("userName").val()}`);
            
            content += `<p class ="name" style="font-weight: bold;"> Welcome Back,
            ${childSnapshot.child("userName").val()}
            </p>`;
          }
        });
        //update our table content
        playerUsername.innerHTML = content;
      } catch (error) {
        console.log("Error getPlayerData" + error);
      }
    }
    else {
      console.log("No players" + error);
    }
  });

  ///PLAYER STATS
  get(playerStats).then((snapshot) => { //retrieve a snapshot of the data using a callback
    if (snapshot.exists()) {
      //if the data exist
      
      try {
        //let's do something about it
        var playerName = document.getElementById("playerStatsUserName");
        var playerNamecontent = "";

        var highestScore = document.getElementById("noOfboxDelivered");
        var highestScorecontent = "";

        var boxesDelivered = document.getElementById("noOfMoneyEarned");
        var boxesDeliveredcontent = "";

        var myStatus = document.getElementById("yourStatus");
        var myStatusContent ="";

        snapshot.forEach((childSnapshot) => {
          //looping through each snapshot
          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
          //console.log("User key:" + childSnapshot.key);
          //console.log("Username:" + childSnapshot.child("userName").val());
          //console.log(`compare ${childSnapshot.key}:SUbyQ9LeZjb2MzjIKIC7wEWvxLW2`)

          let userKey = (childSnapshot.key).trim();

          if (userKey == myData) {

            ////display name
            console.log(`username of playerStats found: ${childSnapshot.child("userName").val()}`);

            //adding data into 'content'
            playerNamecontent += `<td id="userName">
            ${childSnapshot.child("userName").val()}
            </td>`;

            //adding name to display name
            //content += `<p class = "username">
            //${childSnapshot.child("userName").val()}
            //</p>`;

            ////box deliver
            console.log(`no. boxes delivered found: ${childSnapshot.child("noOfboxDelivered").val()}`);

            //adding data into 'content'
            boxesDeliveredcontent += `<td id="noOfboxDelivered">
            ${childSnapshot.child("noOfboxDelivered").val()}
            </td>`;
            
            //update our table content
            //highestScore.innerHTML = content;
            
            ////money earned
            console.log(`highest money earned found: ${childSnapshot.child("noOfMoneyEarned").val()}`);
            
            //adding data into 'content'
            highestScorecontent+= `<td id="noOfMoneyEarned">
            $${childSnapshot.child("noOfMoneyEarned").val()}
            </td>`;

            ////active status

            console.log(`my status: ${childSnapshot.child("active").val()}`);
            var status = "Offline";
            if(childSnapshot.child("active").val() == true){
              status = 'Online'
            }
            else{
              status = 'Offline'
            }
            //adding data into 'content'
            myStatusContent+= `
            ${status}
            `;
          }
        });
        //update our table content
        playerName.innerHTML = playerNamecontent;
        highestScore.innerHTML = highestScorecontent;
        boxesDelivered.innerHTML = boxesDeliveredcontent;
        myStatus.innerHTML = myStatusContent;
  
        
        
      } catch (error) {
        console.log("Error getPlayerData" + error);
      }
    }
    else
    {
      console.log("No playerstat" + error);
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

let logout = document.getElementById("LogOutBTN");
logout.addEventListener("click",  LogOut);
function LogOut(){
  update(ref(db, "playerStats/" + myData),{
    active: false
  });
  update(ref(db, "leaderboards/" + myData),{
    active: false
  });

  update(ref(db, "players/" + myData),{
    active: false
  });
  sessionStorage.clear();
  setTimeout(() => {window.location.href="login.html"}, 1000);
}


