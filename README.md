# liri-node-app

## About
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Commands
Liri.js can run the following commands:
1. my-tweets
2. spotify-this-song
3. movie-this
4. do-what-it-says

### What Each Command Does
1.	**my-tweets:** This command will show the most recent 20 tweets and when they were created in the terminal/bash window.
2.	**spotify-this-song <song name here>:** If the user enters a song title, this command will send the following information about the song to your terminal/bash window. If no song is provided then Liri will default to "The Sign" by Ace of Base.
    * The song's name
    * Artist(s)
    * The album that the song is from
    * A preview link of the song from Spotify 
3.	**movie-this <movie name here>:** If the user enters a movie title, this command will send the following information to your terminal/bash window. If the user doesn't type a movie in, the program will default to the movie 'Mr. Nobody.'
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.

4.	**do-what-it-says:** Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

### To Run the App
1.	Download/save the liri-node-app folder from the Github repository.
2.  To run the Liri app, open your terminal/bash window.
3.  Navigate to the liri-node-app folder in your terminal/bash window.
4.  Install the package dependencies from the package.json file.
5.  Run the commands from the terminal/bash window as indicated:
    * node liri.js my-tweets
    * node liri.js spotify-this-song <song name>
    * node liri.js movie-this <movie name>
    * node liri.js do-what-it-says

### Technologies Used
#### Node.js Packages
    * node-twitter-api package to retrieve current Tweets from the Twitter API.
    * node-spotify-api package in order to retrieve song information from the Spotify API.
    * node request package to retrieve movie information from the IMdb API.
    * fs readFile and fs appendFile to read data from the random.txt and append data to the log.txt.
