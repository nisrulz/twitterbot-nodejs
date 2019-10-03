// Debug flag

var debug = false

// Twitter library
var Twit = require('twit')

//Check config file is filled.
var config = require('./config.js')
if(config.consumer_key == 'blah' ||
   config.consumer_secret == 'blah' ||
   config.access_token == 'blah' ||
   config.access_token_secret == 'blah'){

	console.log("You must fill your configuration file which is located /config.js");
	return;
}

// We need to include our configuration file
var T = new Twit(require('./config.js'))

// This is the URL of a search for the latest tweets on the #hashtag.
var hastagSearch = { q: '#hashtag', count: 10, result_type: 'recent' }

// A user stream
var stream = T.stream('user')
// When someone follows the user
stream.on('follow', followed)
stream.on('tweet', tweetEvent)

// In this callback we can see the name and screen name
function followed (event) {
  var name = event.source.name
  var screenName = event.source.screen_name
  var response = 'Thanks for following me, ' + name + ' @' + screenName
  // Post that tweet!
  T.post('statuses/update', { status: response }, tweeted)

  console.log('I was followed by: ' + name + ' @' + screenName)
}

// Here a tweet event is triggered!
function tweetEvent (tweet) {
  // If we wanted to write a file out
  // to look more closely at the data
  // var fs = require('fs')
  // var json = JSON.stringify(tweet,null,2)
  // fs.writeFile("tweet.json", json, output)

  // Who is this in reply to?
  var reply_to = tweet.in_reply_to_screen_name
  // Who sent the tweet?
  var name = tweet.user.screen_name
  // What is the text?
  var txt = tweet.text

  // Ok, if this was in reply to me
  // Replace selftwitterhandle with your own twitter handle
  console.log(reply_to, name, txt)
  if (reply_to === 'selftwitterhandle') {

    // Get rid of the @ mention
    txt = txt.replace(/@selftwitterhandle/g, '')

    // Start a reply back to the sender
    var reply = 'Hi @' + name + ' ' + ', Thanks for the mention :)'

    console.log(reply)
    // Post that tweet!
    T.post('statuses/update', { status: reply }, tweeted)
  }
}

// This function finds the latest tweet with the #hashtag, and retweets it.
function retweetLatest () {
  T.get('search/tweets', hastagSearch, function (error, data) {
    var tweets = data.statuses
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text)
    }
    // If our search request to the server had no errors...
    if (!error) {
      // ...then we grab the ID of the tweet we want to retweet...
      var retweetId = data.statuses[0].id_str
      // ...and then we tell Twitter we want to retweet it!
      T.post('statuses/retweet/' + retweetId, {}, tweeted)
    }
    // However, if our original search request had an error, we want to print it out here.
    else {
      if (debug) {
        console.log('There was an error with your hashtag search:', error)
      }
    }
  })
}

// Make sure it worked!
function tweeted (err, reply) {
  if (err !== undefined) {
    console.log(err)
  } else {
    console.log('Tweeted: ' + reply)
  }
}

// Try to retweet something as soon as we run the program...
retweetLatest()
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 12)
