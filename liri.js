// Set up the environment to run the Spotify and Twitter API's:
// This code is necessary to read and set environment variables with the dotenv package:
require("dotenv").config();

// This code imports the keys.js file which holds the Twitter and Spotify API keys:
var keys = require("./keys.js");

// Now, make it so liri.js can take in the following commands: 
// my-tweets, spotify-this-song, movie-this, do-what-it-says

// Some globals:
// Create an empty variable for taking in the song and movie inputs:
var songName = "";
var movieName = "";
// Create variables for song and movie defaults:
var songDefault = "The Sign";
var movieDefault = "Mr. Nobody";

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
        break;
    case "movie-this":
        movies();
        break;
    case "do-what-it-says":
        doIt();
        break;
    default:
        // console.log("No command was entered. Please enter one of the following: 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'");
        break;
}

// TWITTER CODE: Command "my-tweets" - This will show my last 20 tweets and when they were created in the terminal/bash window.
function twitter() {
    // Include the require Twitter package: 
    var Twitter = require('twitter');
    //  Access the twitter keys from the keys.js file:
    var client = new Twitter(keys.twitter);
    // console.log("This is the client: ", client);
    var params = {
        // My username here and add the count parameter. Show 20 tweets.
        screen_name: 'natroberts19',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // Loop through the tweets and display the text of the results.
            for (var i = 0; i < tweets.length; i++) {
                console.log("---------------------------------");
                console.log("natroberts19: ", tweets[i].text);
                console.log("created at: ", tweets[i].created_at);
                // BONUS: Add tweets to log.txt file...
                var fs = require('fs');

                fs.appendFile('log.txt', tweets[i].text, function (err) {
                    if (err) throw err;
                });
            }
        }
    });
}

// SPOTIFY CODE: Command "spotify-this-song '<song name here>'" - This will pull in the song info based on the instructions and default to "The Sign" by Ace of Base if no song is requested.
function spotify() {
    // Include the require Spotify package.
    var Spotify = require('node-spotify-api');
    //  Access the spotify keys from the keys.js file:
    var spotify = new Spotify(keys.spotify);
    // Store all of the arguments in an array. Use process.argv with no index position because the variable nodeArgs will only be called if it is greater than index position of 3.
    var nodeArgsSpotify = process.argv;
    // // Create an empty variable for holding the song name
    // var songName = "";
    // Loop through all the words in the node argument to accomodate multi-word song titles.
    for (var i = 3; i < nodeArgsSpotify.length; i++) {
        if (i > 3 && i < nodeArgsSpotify.length) {
            songName = songName + " " + nodeArgsSpotify[i];
        } else {
            songName += nodeArgsSpotify[i];
        }
    }

    // Access and request song data from the Spotify API. 
    // Reference from Stack: https://stackoverflow.com/questions/47657135/how-to-extract-data-from-spotify-npm-package-i-keep-getting-undefine  
    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else if (err, data) {
            console.log("---------------------------------");
            console.log("Song Name: ", songName.toUpperCase());
            console.log("Artist Name: ", data.tracks.items[0].album.artists[0].name);
            console.log("Album Name: ", data.tracks.items[0].album.name);
            console.log("Preview URL: ", data.tracks.items[0].preview_url)
            console.log("---------------------------------");
            // BONUS: Add song to log.txt file...
            var fs = require('fs');

            fs.appendFile('log.txt', songName, function (err) {
                if (err) throw err;
            });
        }
        // "else" conditional for if no song name is entered...add "The Sign" by Ace of Base.
        // else () {
        // console.log("---------------------------------");
        // console.log("The Sign, Ace of Base");
        // }        
    })
};

// MOVIES CODE: Command "node liri.js movie-this '<movie name here>'" - pull in the movie info listed in the instructions and default to Mr. Nobody if no movie is entered.
function movies() {
    // Include the request npm package.
    var request = require("request");
    // Store all of the arguments in an array. Use process.argv with no index position because the variable nodeArgsMovies will only be called if it is greater than index position of 3.
    var nodeArgsMovies = process.argv;
    // Loop through all the words in the node argument and handle the inclusion of "+"s to accomodate multi-word movie titles.
    for (var i = 3; i < nodeArgsMovies.length; i++) {
        if (i > 3 && i < nodeArgsMovies.length) {
            movieName = movieName + "+" + nodeArgsMovies[i];
        } else {
            movieName += nodeArgsMovies[i];
        }
    }

    // If movieName is defined, then run a request to the OMDB API with the movie specified.
    var queryUrlMovies = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"

    // if (body.Title === undefined) {
    //     console.log("Default Movie: ", movieDefault);
    //     }

    request(queryUrlMovies, function (error, response, body) {
        // If the request is successful
        // Create a contingency statement to pull in the movie default if no movieName is entered:
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover the Title, Year, IMDB Rating, Rotten Tomatoes Rating, Country, Language, Plot, Actors.
            // Log the results:
            console.log("---------------------------------")
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("---------------------------------");
            // BONUS: Add movie to log.txt file...
            var fs = require('fs');
            // Separate with new line to make it look nicer...
            fs.appendFile('log.txt', "Movie: " + movieName + "\n\n------------------------\n\n", function (err) {
                if (err) throw err;
            });
        } else if (body.Title === undefined) {
            // log the error/status."
            console.log("---------------------------------")
            console.log("Hmmm, something isn't right. Try again!");
            // console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
            console.log("---------------------------------");
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
        // console.log(data);
        // Break the string down by comma separation.
        var dataArr = data.split(",");
        // Re-display the content as an array for later use.
        // console.log("Split result: ", dataArr);
        //   Loop through the newly created output array.
        for (var i = 0; i < dataArr.length; i++) {
            // console.log("Split result after loop: ", dataArr[i]);
        }
        // Create variables for the command at index 0 and the song at index 1??
        var command = dataArr[0];
        // console.log("Command: ", command);
        var song = dataArr[1];
        // console.log("Song: ", song);
        doItSearch();

        // Now try to search for the song at dataArr position 1 and display the information.??
        function doItSearch() {
            // Include the require Spotify package.
            var Spotify = require('node-spotify-api');
            //  Access the spotify keys from the keys.js file:
            var spotify = new Spotify(keys.spotify);
            // Store all of the arguments in an array. Use process.argv with no index position because the variable nodeArgs will only be called if it is greater than index position of 3.
            var nodeArgsSpotify = process.argv;
            // // Create an empty variable for holding the song name
            // var songName = "";
            // Loop through all the words in the node argument to accomodate multi-word song titles.
            for (var i = 3; i < nodeArgsSpotify.length; i++) {
                if (i > 3 && i < nodeArgsSpotify.length) {
                    song = song + " " + nodeArgsSpotify[i];
                } else {
                    song += nodeArgsSpotify[i];
                }
            }

            // Access and request song data from the Spotify API. 
            // Reference from Stack: https://stackoverflow.com/questions/47657135/how-to-extract-data-from-spotify-npm-package-i-keep-getting-undefine  
            spotify.search({
                type: 'track',
                query: song
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                } else if (err, data) {
                    console.log("---------------------------------");
                    console.log("Song Name: ", song.toUpperCase());
                    console.log("Artist Name: ", data.tracks.items[0].album.artists[0].name);
                    console.log("Album Name: ", data.tracks.items[0].album.name);
                    console.log("Preview URL: ", data.tracks.items[0].preview_url)
                    console.log("---------------------------------");
                    // BONUS: Add song to log.txt file...
                    var fs = require('fs');

                    fs.appendFile('log.txt', song, function (err) {
                        if (err) throw err;
                    });
                }
            })
        };
    });
}

// Create Inquirer menu to start the program:
// Load the NPM Package inquirer
// var inquirer = require("inquirer");

// Create a variable to hold the menu choices.
// var menu = [
// {
//         type: "list",
//         message: "Choose a command.",
//         choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
//         name: "commandChoice"
//     },
// {
//       type: "input",
//       message: "Please enter a song or movie title first, or just hit Enter.",
//       name: "userInput",
//     }
// ]

// Create a "Prompt" function using the variable above as a parameter.
// inquirer.prompt(menu)
//   .then(function(inquirerResponse) {
//     // var command = inquirerResponse.commandChoice;
//        var movieName = inquirerResponse.userInput;
//        var songName = inquirerResponse.userInput;
//       console.log("Command Choice: " + inquirerResponse.commandChoice);
//       console.log("User Input: " + inquirerResponse.userInput);
//     });