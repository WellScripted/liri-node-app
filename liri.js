//liri.js
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

//SPOTIFY
if (process.argv[2] == 'spotify-this-song') {
    var songName = process.argv.slice(3).join(" ");
    if (songName === undefined) {
        songName = "The sign by Ace of Base";
    }
}

spotify.search({ type: 'track', query: songName, limit: 10 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    var tableArray = [];

    //For loop
    for(var i = 0; i < data.tracks.items.length; i++){
        //console.log(data.tracks.items[i]);
        //console.log("album name: " + data.tracks.items[i].album.name); 
        var result = {
            artist: data.tracks.items[i].album.artists[0].name,
            album_name: data.tracks.items[i].album.name,
            song_name: data.tracks.items[i].name,
            preview_url: data.tracks.items[i].preview_url,
        }
        tableArray.push(result);
    }
    console.log(result);
  });

//OMDB  
//} else if (process.argv[2] == 'movie-this') {
//    var movieName = process.argv.slice(3).join(" ");

//    if (movieName == undefined) {
//        movieName = "Mr. Nobody";
//    }

//    request('http://www.omdbapi.com/?i=tt3896198&apikey=97174f8d' + process.argv[3], function(error, response, body) {

 //       var result = JSON.parse(body);
 //       console.log("Title :" + result.Title);
 //       console.log("Year :" + result.Released);
 //       console.log("IMDB Rating :" + result.imdbRating );
  //      console.log("Rotten Tomatoes :" + result.Ratings[1].Value);
   //     console.log("Country :" +  result.Country);
    //    console.log("Language :" + result.Language);
 //       console.log("Movie Plot :" + result.Plot);
   //     console.log("Actors :" +  result.Actors);

    //}
// });
