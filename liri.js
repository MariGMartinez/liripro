require('dotenv').config()
var Twitter = require("twitter")
var Spotify = require("node-spotify-api")
var Request = require("request")
var FS = require("fs")
var keys = require("./keys.js")

// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`
var operations = process.argv[2]
// console.log (process.argv[0])
// console.log (process.argv[1])
// console.log (process.argv[2])

function spotify() {
  var spotifySearch=new Spotify ({
      id:"6df529e2bdf54f75ba6dc2277389c6e1",
      secret:"115ca104f20f4ba580b2b31023184e48"
  })
    spotifySearch.search({ type: 'track', query: process.argv[3]  }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err); 
            return;
        }
        var spotifyData =data.tracks.items
        console.log(spotifyData[0].name)
        console.log(spotifyData[0].artists[0].name)
        console.log (spotifyData[0].album.name)
        //console.log(spotifyData)
        // Do something with 'data' 
    });
}


if (operations === "my-tweets") {
    twitter()
}

else if (operations === "spotify-this-song") {
    spotify()
}
else if (operations === "movie-this") {
    var movie=process.argv[3];
    omdb(movie)
   
}
else if (operations === "do-what-it-says") {
    fs()
}
function omdb(movieTitle) {
    Request("http://www.omdbapi.com/?t=" + movieTitle + "&apikey=81d6b13", function (error, response, body) {
    var movieData=JSON.parse(body)    
    console.log("Title: " + movieData.Title)
    console.log("Year: "+ movieData.Year)
    console.log("Ratings: "+movieData.imdbRatings)
    console.log("Country: "+movieData.Country)
    console.log("Plot: "+movieData.Plot)
    })

}

function fs() {

}

function twitter() {
    var client = new Twitter(keys.twitter)
    var params = { screen_name: 'Coach_Marigol', count: 10 }
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            var tweetArr = []
            for (var i = 0; i < tweets.length; i++) {
                tweetArr.push({
                    tweet: tweets[i].text

                })
                console.log(tweetArr)
            }

        }

        else {
            console.log(error)
        }
    });

}



