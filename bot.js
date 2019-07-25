// Developed by basilisk for use as a twitterbot boilerplate to help clients increase exposure by quote tweeting from a range of hashtags
// and a range of canned responses with @mentions to increase traffic through their sites.

var debug = true;
var Twit = require('twit')
var T = new Twit(require('./config.js'))
var myScreenName = 'binarybotrading';

// Array of hashtags or usernames to randomly search for on each cycle of the bot:
var hashtags = ['#binarybot', '#autotrading', 'binarydotcom', '#binarytrading', '#iqoption', '#binaryoptionsignals', '#binarysignals', '#binarysignal', '#tradingbot'] // A list of as may hashtags as you like.

//status text for quoted tweets (array of canned responses keep vague but different enough to make the bot seem more real life)
var quoteComment = [
  'Try our mobile autotrader for @Binarydotcom | http://bit.ly/2K0GArX #binarybot #autotrading',
  'Try our autotrading app for @Binarydotcom | http://bit.ly/2Y10EUI #binaryoptions #makemoneyonline',
  'Join our binarybot community for @Binarydotcom https://discord.gg/mEXmWvH #binarytrading #binarybot #makemoneyonline #binarysignals',
  'Start robotic trading for free with bbTrader (http://bit.ly/2Y10EUI) powered by @Binarydotcom',
  'Use our totally free mobile trading bot for @Binarydotcom (http://bit.ly/2K0GArX) starting #makingmoneyonline now! #binarytrading',
  'Be part of our binary bot movement! Free autotrading for mobile and web, forever! https://discord.gg/mEXmWvH #makemoneyonline #binaryoptions #trading'

];

// This function finds the latest tweet with the #hashtag, and retweets it.
function retweetLatest() {

  // Randomly select the hashtag to search
  var hash = hashtags[Math.floor(Math.random() * hashtags.length)];
  var quote = quoteComment[Math.floor(Math.random() * quoteComment.length)];
  //generate the search object:
  var hashtagSearch = {
    q: hash,
    count: 20,
    result_type: 'recent'
  };
  console.log(hash);



  // Search twitter using the randomly chosen hashtag:

  T.get('search/tweets', hashtagSearch, function (error, data) {


    var tweets = data.statuses.filter(data => data.user.screen_name != myScreenName); // remove any tweets already sent by you from search
    console.log(data.statuses.length);
    console.log(tweets.length);


    var randomisedTweet = [Math.floor(Math.random() * tweets.length)]

    console.log(tweets[randomisedTweet]);


    if (tweets[randomisedTweet] != undefined) {


      for (var i = 0; i < tweets.length; i++) {
        // potential option here to use for loop to extract from search list
      }
      if (!error) {
        // ...grab the ID of the tweet we want to quote and get username of tweeter...
        var retweetId = tweets[randomisedTweet].id_str;
        var mention = tweets[randomisedTweet].user.screen_name;

        console.log(retweetId);
        console.log('@' + tweets[randomisedTweet].user.screen_name);


        // Retweet
        //  T.post('statuses/retweet/' + retweetId, {}, tweeted);

        // Quote Tweet with @mention of original user
        // T.post('statuses/update', {
        // status: '@' + mention + ' ' + quote + ' https://twitter.com/TwitterDev/statuses/' + retweetId
        //}, tweeted);

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

// Callback to make sure it worked!
function tweeted(err, reply) {
  if (err !== undefined) {
    console.log(err.message);
  } else {
    console.log('Tweeted sucessfully!');
  }
}

// Try to retweet something as soon as we run the program...
retweetLatest()
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 12)




function reportBouncer(arr) {
  return arr.filter(Boolean);
};