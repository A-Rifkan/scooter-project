const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  //constructor(stations, retisteredUsers) <--- correct params 
  constructor(registeredUsers) {
    this.stations = {
      wolverhampton: [],
      leicester: [],
      manchester: []
    }
    this.registeredUsers = registeredUsers
  }

  registerUser(username, password, age) {
    for (let i = 0; i < Object.keys(this.registeredUsers).length; i++) {
      if (Object.keys(this.registeredUsers)[i] == username) {
        return console.log("already registered");
      }
    }
    if (age < 18) {
      return console.log("too young to register");
    }
    this.registeredUsers[username] = password;
    console.log("user has been added")
  }
  loginUser(username, password) {
    let bool = false;
    for (let i = 0; i < Object.keys(this.registeredUsers).length; i++) {
      if ((username in this.registeredUsers && this.registeredUsers[username].password == password)) {
      console.log("user has been logged in")
      bool = true
      this.registeredUsers[username].loggedIn = true;
      break;
    } 
    }
    if (!bool) {
      console.log("incorrect username or password")
    }
  }
  
  logOutUser (username) {
    let bool = false
    for (let i = 0; i < Object.keys(this.registeredUsers).length; i++) {
      if (username in this.registeredUsers) {
        console.log("user has been logged out");
        bool = true
        this.registeredUsers[username].loggedIn = false
        break;
      } 
      
    }
    if (!bool) {
      console.log("no such user was logged in")
    }
  }
  
  createScooter(station) {
    let newScooter = new Scooter (station, null, 1, 1, 100, false)
    if (station in this.stations) {
    this.stations[station].push(newScooter);
    console.log("created new scooter");
    return newScooter
    } else {
      throw new Error ("no such station");
    }
  }
  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    }
    if (scooter.station === station) {
      throw new Error("scooter already at station");
    }
    this.stations[station].push(scooter);
    scooter.station = station;
    scooter.dock();
    console.log(`Scooter is docked at ${station}`);
  }

  rentScooter(scooter, user) {
    if(scooter.station in this.stations) {
      scooter.user = user;
      scooter.station = null;
      console.log("scooter is rented");
    } else {
      console.log("scooter already rented")
    }
  }

  print(){
    let keys = Object.keys(this.registeredUsers)
    let stationKeys = Object.keys(this.stations)
    console.log("--------------------------------------------------")
    console.log("Current Registered Users:")
    console.log(keys)
    console.log("--------------------------------------------------")
    console.log("Current Docked Scooters:")

    for (let i=0; i<stationKeys.length; i++){
      let scooterCount = this.stations[stationKeys[i]].length;
      if(this.stations[stationKeys[i]][0].station == null)
      {
        scooterCount--;
      }
      console.log(stationKeys[i] + " : " + scooterCount)
    }
    console.log("--------------------------------------------------")
  }

}//last curly bracket for class



// userObj = {

// }


module.exports = ScooterApp
