//liri.js
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

//SPOTIFY

var getSong = function(songName) {
  
    if (songName === undefined) {
      songName = "the sign"
    }
    spotify.search(
      {
        type: "track",
        query: songName,
        limit: 10
      },
      function(err, data) {
        if (err) {
          return console.log("Error occurred: " + err);
        }
  
        //For loop
        for (var i = 0; i < data.tracks.items.length; i++) {
          //console.log(data.tracks.items[i]);
          //console.log("album name: " + data.tracks.items[i].album.name);
  
          console.log(`Artist: ${data.tracks.items[i].album.artists[0].name}`);
          console.log(`Albumname: ${data.tracks.items[i].album.name}`);
          console.log(`Song name: ${data.tracks.items[i].name}`);
          console.log(`Preview url: ${data.tracks.items[i].preview_url}`);
          console.log("---------------------");
        }
      }
    );
  };
  
  //OMDB
  var getMovie = function(movieName) {
    if (movieName === undefined) {
      movieName = "Mr Nobody"
    }
  
    var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy"
    axios.get(movieUrl)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });      
  }
  
  // Switch statement to determine what action to take based on user input in command line
  var userPick = function(action, userChoice) {
    switch (action) {
      case "spotify-this-song":
        if(userChoice){
            getSong(userChoice);
        }else{
            getSong('Ace of Bass');
        }
        break;
      case "movie-this":
        getMovie(userChoice);
        break;
      default:
        console.log("Liri does not know that command");
    }
  };
  
  // Run the command based on the two arguments the user provides
  var runCommand = function(arg1, arg2) {
    userPick(arg1, arg2);
  };
  
  runCommand(process.argv[2], process.argv.slice(3).join(" "));
