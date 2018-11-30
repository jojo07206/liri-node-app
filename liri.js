var fs = require("fs");
require("dotenv").config();
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var firstInput = process.argv[2];
var secondInput = process.argv[3];

// // IMDB function
if (firstInput == 'movie-this') {
    if (secondInput != null) {
        axios.get("https://www.omdbapi.com/?t=" + secondInput + "&y=&plot=short&apikey=6bf18958")
            .then(function (response) {
                console.log(response.data.Title);
                console.log(response.data.Year);
                console.log(response.data.imdbRating);
                console.log(response.data.Ratings[1].Value);
                console.log(response.data.Country);
                console.log(response.data.Language);
                console.log(response.data.Plot);
                console.log(response.data.Actors);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
            })
    } else {
        axios.get("https://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=6bf18958")
            .then(function (response) {
                console.log(response.data.Title);
                console.log(response.data.Year);
                console.log(response.data.imdbRating);
                console.log(response.data.Ratings[1].Value);
                console.log(response.data.Country);
                console.log(response.data.Language);
                console.log(response.data.Plot);
                console.log(response.data.Actors);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
            })
    }
}

//Spotify function
if (firstInput == 'spotify-this-song') {
    spotify.search({ type: 'track', query: secondInput })
        .then(function (response) {
            console.log(JSON.stringify(response.tracks.items[0].artists[0].name));
            console.log(secondInput);
            console.log(JSON.stringify(response.tracks.items[0].album.uri));
            console.log(JSON.stringify(response.tracks.items[0].album.name));

        })
}

// do-what-it-says function
if (firstInput == 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } else {
            spotify.search({ type: 'track', query: data })
                .then(function (response) {
                    console.log(JSON.stringify(response.tracks.items[0].artists[0].name));
                    console.log(data);
                    console.log(JSON.stringify(response.tracks.items[0].album.uri));
                    console.log(JSON.stringify(response.tracks.items[0].album.name));
                })
        }
    })
}

//Bands in town function
if (firstInput == 'concert-this') {
    axios.get("https://rest.bandsintown.com/artists/" + secondInput + "/events?app_id=dbef0442baec91a6d042e1d59fa5596a")
        .then(function (response) {
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city);
            var datetime = response.data[0].datetime;
            var finaldate = moment(datetime).format('MM/DD/YYYY');
            console.log(finaldate);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data.venue.name);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
        })
} 