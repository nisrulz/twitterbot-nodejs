// Debug flag

var debug = true

// Twitter library
var Twit = require('twit')

// We need to include our configuration file
var T = new Twit(require('./config.js'))

// Array of hashtags to randomly search for on each cycle of the bot:
var hashtags = ['#binarybot', '#autotrading', '#binaryoptions', '#tradingbot']


/*
// A user stream
var stream = T.stream('user')
// When someone follows the user
stream.on('follow', followed)
stream.on('tweet', tweetEvent)

// In this callback we can see the name and screen name
function followed(event) {
  var name = event.source.name
  var screenName = event.source.screen_name
  var response = 'Thanks for following bbTrader, ' + name + ' @' + screenName + '! why not checkout https://webtrader.binarybottrading.eu or https://bbmobile.binarybottrading.eu !!'
  // Post that tweet!
  T.post('statuses/update', {
    status: response
  }, tweeted)

  console.log('I was followed by: ' + name + ' @' + screenName)
}

// Here a tweet event is triggered!
function tweetEvent(tweet) {
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
    var reply = 'Hi @' + name + ' ' + ', Thanks for the mention, why not joinour discord: https://discord.gg/xVtsakq'

    console.log(reply)
    // Post that tweet!
    T.post('statuses/update', {
      status: reply
    }, tweeted)
  }
}
*/

// This function finds the latest tweet with the #hashtag, and retweets it.
function retweetLatest() {

  // Randomly select the hashtag to search
  var hash = hashtags[Math.floor(Math.random() * hashtags.length)]
  //generate the search object:
  var hashtagSearch = {
    q: hash,
    count: 10,
    result_type: 'recent'
  };
  console.log(hash);
  T.get('search/tweets', hashtagSearch, function (error, data) {
    var tweets = data.statuses
    if (data.statuses[0] != undefined) {
      for (var i = 0; i < tweets.length; i++) {
        // console.log(tweets[i].text)
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
    } else {
      console.log('No tweets found on hashtag, running again');
      retweetLatest();
    }
  });

}

// Make sure it worked!
function tweeted(err, reply) {
  if (err !== undefined) {
    console.log(err.message);
  } else {
    console.log('Tweeted: ', reply);
  }
}

// Try to retweet something as soon as we run the program...
retweetLatest()
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 12)