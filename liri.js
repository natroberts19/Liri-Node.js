require("dotenv").config();

var info = require("./keys.js");
console.log(info);

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
console.log(client);
