
let playerStats = {
    "createdOn": 0,
    "totalMoney": 12.277702331542969,
    "totalTimeSpent": 7.589897155761719,
    "updatedOn": 0,
    "userName": "Melvyn"
  }
  
  // to access and change the value
  //playerStats.createdOn = 7213123;
  //console.log(playerStats.createdOn);
  
  //function based objects in JS
  //parameters total
  function PlayerStats(createdOn, totalMoney, totalTimeSpent, updatedOn, userName) {
    this.createdOn = createdOn;
    this.totalMoney = totalMoney;
    this.totalTimeSpent = totalTimeSpent;
    this.updatedOn = updatedOn;
    this.userName = userName;
  }
  
  //how to create an object
  // same as creating objects in c#
  let newPlayer = new PlayerStats(100, 1234564.213, 123, 4956, "I am a new player")
  console.log(newPlayer);