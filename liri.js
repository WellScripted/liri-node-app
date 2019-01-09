//liri.js
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var axios = require("axios");
//var moment = require("moment"); -- "Bands in Town" not included
var fs = require("fs");
var spotify = new Spotify(keys.spotify);


//SPOTIFY

var getSong = function (songName) {

  if (songName === "") {
    songName = "the sign"
  }
  spotify.search(
    {
      type: "track",
      query: songName,
      limit: 10
    },
    function (err, data) {
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
var getMovie = function (movieName) {
  if (movieName === "") {
    movieName = "Mr Nobody"
  }

  var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy"
  axios.get(movieUrl)
    .then(function (response) {
      //console.log(response.data);
      console.log("Title :" + response.data.Title);
      console.log("Year :" + response.data.Released);
      console.log("IMDB Rating :" + response.data.imdbRating );
      console.log("Rotten Tomatoes :" + response.data.Ratings[1].Value);
      console.log("Country :" +  response.data.Country);
      console.log("Language :" + response.data.Language);
      console.log("Movie Plot :" + response.data.Plot);
      console.log("Actors :" +  response.data.Actors);
      console.log("---------------------");
    })
    .catch(function (error) {
      console.log(error);
    });
}

var justDoIt = function() {
  fs.readFile("random.txt", "utf8", function (err, data){
    console.log(data);
    var dataArray = data.split(",");
    if (dataArray.length === 2){
      userPick(dataArray[0], dataArray[1]);
    }else if (dataArray.length = 1){
      userPick(dataArray[0]);
    }
  })
}

// Switch statement to determine what action to take based on user input in command line
var userPick = function (action, userChoice) {
  switch (action) {
    case "spotify-this-song":

      getSong(userChoice);

      break;
    case "movie-this":

      getMovie(userChoice);

      break;
    case "do-what-it-says":

      justDoIt();

      break;
    default:
      console.log("Liri does not know that command");
  }
};

// Run the command based on the two arguments the user provides
var runCommand = function (arg1, arg2) {
  userPick(arg1, arg2);
};

runCommand(process.argv[2], process.argv.slice(3).join(" "));
