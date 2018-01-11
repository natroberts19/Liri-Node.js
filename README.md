# liri-node-app
# About
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
# Commands
Liri.js can take in one of the following commands:
my-tweets
spotify-this-song
movie-this
do-what-it-says
# What Each Command Does
1.	node liri.js my-tweets This will show your last 20 tweets and when they were created at in your terminal/bash window.
2.	node liri.js spotify-this-song '<song name here>' This will show the following information about the song in your terminal/bash window:
    Artist(s), 
    The song's name, 
    A preview link of the song from Spotify, 
    The album that the song is from.
If no song is provided then your program will default to "The Sign" by Ace of Base.
The app utilizes the node-spotify-api package in order to retrieve song information from the Spotify API.
3.	node liri.js movie-this '<movie name here>'	This will output the following information to your terminal/bash window:
    o	 Title of the movie.
    o	 Year the movie came out.
    o	 IMDB Rating of the movie.
    o	 Rotten Tomatoes Rating of the movie.
    o	 Country where the movie was produced.
    o	 Language of the movie.
    o	 Plot of the movie.
    o	 Actors in the movie.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
4.	node liri.js do-what-it-says	Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
