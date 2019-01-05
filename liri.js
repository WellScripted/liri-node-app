//liri.js
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

//SPOTIFY
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    //For loop
    for(var i = 0; i < 5; i++){
        console.log(data.tracks.items[i]);
        console.log("album name: " + data.tracks.items[i].album.name); 
    }
  });
