// Developed by basilisk for use as a twitterbot boilerplate to help clients increase exposure by quote tweeting from a range of hashtags
// and a range of canned responses with @mentions to increase traffic through their sites.

var G = require('./globals');
var follow = require('./lib/followNew');
var reply = require('./lib/followBack');
var reTweet = require('./lib/reTweet');

follow.users()
setInterval(follow.users, 1000 * 60 * 60 * G.followFreq);


setTimeout(function () {
  reply.thankyou()
  setInterval(reply.thankyou, 1000 * 60 * 60 * G.followBackFreq);
}, 5000);

setTimeout(function () {
  reTweet.now()
  setInterval(reTweet.now, 1000 * 60 * 60 * G.reTweetFreq);
}, 10000);