// Global variables for use in the bot.
// Change these to suit your twitter account / goals.

var Global = {

    // your twitter username
    'myScreenName': 'binarybotrading',
    'myID': '1112293838440275970', // get it like this: https://www.wikihow.com/Find-Your-User-ID-on-Twitter 


    // hashtags, usernames and phrases to monitor:
    'hashtags': ['#binarybot', '#autotrading', 'binarydotcom', '#binarytrading', '#iqoption', '#binaryoptionsignals', '#binarysignals', '#binarysignal', '#tradingbot'], // A list of as may hashtags as you like.



    // your list of canned responses, the more you have the more flexible your reponses;
    //Futurebuilds will have 
    'quoteComment': [
        'Try our mobile autotrader for @Binarydotcom | http://bit.ly/2K0GArX #binarybot #autotrading',
        'Try our autotrading app for @Binarydotcom | http://bit.ly/2Y10EUI #binaryoptions #makemoneyonline',
        'Join our binarybot community for @Binarydotcom https://discord.gg/mEXmWvH #binarytrading #binarybot #makemoneyonline #binarysignals',
        'Start robotic trading for free with bbTrader (http://bit.ly/2Y10EUI) powered by @Binarydotcom',
        'Use our totally free mobile trading bot for @Binarydotcom (http://bit.ly/2K0GArX) starting #makingmoneyonline now! #binarytrading',
        'Be part of our binary bot movement! Free autotrading for mobile and web, forever! https://discord.gg/mEXmWvH #makemoneyonline #binaryoptions #trading'

    ],

    // Thankyou message for new  follower:
    'thanks': 'Thanks for following bbTrader',

    'includeQuote': true, // change to false if you don't want to include a quote from 'quoteComment'  when thankinga new follower.

    //ratio of retweets to quoted tweets NOTE:quoted tweets can be spammy use in small amounts as they include mentions.
    'RetweetQuoteRatio': 0.7,

    //Time in minutes to run each function **BEWARE OF API RATE LIMITS AND SPAMMY BEHAVIOUR!!! 
    'followFreq': 60,
    'reTweetFreq': 120,
    'followBackFreq': 30,


    //globals (leave as they are)
    'followers': undefined,
    'welcomeTweets': [],
    'newFollowList': [],
    'data': [],
    'debug': true,
}

module.exports = Global;