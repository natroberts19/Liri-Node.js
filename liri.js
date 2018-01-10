// This code is necessary to read and set environment variables with the dotenv package:
require("dotenv").config();

// This code imports the keys.js file which holds the Twitter and Spotify API keys:
var keys = require("./keys.js");

// Now, make it so liri.js can take in the following commands: 
// my-tweets, spotify-this-song, movie-this, do-what-it-says

// COMMAND CODE BELOW:
// Set up a variable to represent each of the commands:
var command = process.argv[2];

// Set up a switch statement for each command.
// Create the code blocks for each command.
switch (command) {
    case "my-tweets":
        twitter();
        break;
    case "spotify-this-song":
        spotify();
        // Add in a contingency for when no song title is entered then default to The Sign:
            // *** ADD CODE HERE ***
        break;
    case "movie-this":
        movies();
         // Add in a contingency for when no movie title is entered then default to Mr. Nobody:
            // *** ADD CODE HERE ***
        break;
    case "do-what-it-says":
        doIt();
        break;
    default:
        console.log("No command was entered.");
        break;
}

// TWITTER CODE: Command "node liri.js my-tweets" - This will show my last 20 tweets and when they were created in the terminal/bash window.
function twitter() {
    // Include the require Twitter package: 
    var Twitter = require('twitter');
    //  Access the twitter keys from the keys.js file:
    var client = new Twitter(keys.twitter);
    console.log("This is the client: ", client);

    var params = {
        screen_name: 'nodejs'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("These are the tweets: ", tweets);
        }
    });
}

// SPOTIFY CODE: Command "node liri.js spotify-this-song '<song name here>'" - This will pull in the song info based on the instructions and default to "The Sign" by Ace of Base if no song is requested.
function spotify() {
    // Include the require Spotify package.
    var Spotify = require('node-spotify-api');
    //  Access the spotify keys from the keys.js file:
    var spotify = new Spotify(keys.spotify);
    // Store all of the arguments in an array. Use process.argv with no index position because the variable nodeArgs will only be called if it is greater than index position of 3.
    var nodeArgsSpotify = process.argv;
    // Create an empty variable for holding the song name
    var songName = "";
    // Loop through all the words in the node argument to accomodate multi-word song titles.
    for (var i = 3; i < nodeArgsSpotify.length; i++) {
        if (i > 3 && i < nodeArgsSpotify.length) {
            songName = songName + " " + nodeArgsSpotify[i];
            } else {
            songName += nodeArgsSpotify[i];
        }
    }

    // Access and request song data from the Spotify API. 
    // Solution from Stack: https://stackoverflow.com/questions/47657135/how-to-extract-data-from-spotify-npm-package-i-keep-getting-undefine  
    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log("Song Name: ", songName.toUpperCase());
            console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name);
        };
    });
}

// MOVIES CODE: Command "node liri.js movie-this '<movie name here>'" - pull in the movie info listed in the instructions and default to Mr. Nobody if no movie is entered.
function movies() {
    // Include the request npm package.
    var request = require("request");
    // Store all of the arguments in an array. Use process.argv with no index position because the variable nodeArgs will only be called if it is greater than index position of 3.
    var nodeArgsMovies = process.argv;
    // Create an empty variable for holding the movie name
    var movieName = "";
    // Loop through all the words in the node argument and handle the inclusion of "+"s to accomodate multi-word movie titles.
    for (var i = 3; i < nodeArgsMovies.length; i++) {
        if (i > 3 && i < nodeArgsMovies.length) {
            movieName = movieName + "+" + nodeArgsMovies[i];
        } else {
            movieName += nodeArgsMovies[i];
        }
    }
    // Then run a request to the OMDB API with the movie specified.
    var queryUrlMovies = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"

    request(queryUrlMovies, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover the Title, Year, IMDB Rating, Rotten Tomatoes Rating, Country, Language, Plot, Actors.
            // Log the results:
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

// DOIT CODE: Command "node liri.js do-what-it-says" - using fs node package, read the info listed from the random.txt file.
function doIt() {
    // Use file system (fs) to read the info from the random.txt file.
    var fs = require("fs");
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Log the contents of data
        console.log(data);

        // Break the string down by comma separation.
        var dataArr = data.split(",");

        // Re-display the content as an array for later use.
        console.log(dataArr);

        //   Loop through the newly created output array.
        for (var i = 0; i < dataArr.length; i++) {
            console.log(dataArr[i]);
        }
    });
}