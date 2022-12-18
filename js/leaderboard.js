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
const leaderboard = ref(db, "leaderboards");

//Retrieve from login
var myData = sessionStorage.getItem('UUID');
console.log("this is my data in leaderboard: " + myData);

var limit = 10;

  getLB(limit);
  function getLB(limit = 10){
    //q = get(lb).then(orderByChild("noOfMoneyEarned").LimitToLast(limit));
    //lbList=[];
  
    get(leaderboard).then((snapshot) => { //retrieve a snapshot of the data using a callback
      if (snapshot.exists()) {
        //if the data exist
        
        try {
          //let's do something about it
          var overLeaderBoard = document.getElementById("leaderBoardData");
          var content = "";
          snapshot.forEach((childSnapshot) => {
            //console.log(childSnapshot);
            //looping through each snapshot
            console.log(`username of players found: ${childSnapshot.child("userName").val()}`);
            content += `<tr>
            <td>${childSnapshot.child("userName").val()} </td>
            <td>${childSnapshot.child("userName").val()}</td>
            <td>${childSnapshot.child("noOfMoneyEarned").val()}</td>
            <td>${childSnapshot.child("noOfboxDelivered").val()}</td>
            </tr>`;
            
                                              
          });
          overLeaderBoard.innerHTML = content;
          
        } catch (error) {
          console.log("Error getPlayerData" + error);
        }
        
      }
      else {
        //@TODO what if no data ?
      }
    });
  }

  function GetCurrentUser(){
    return user;
  }