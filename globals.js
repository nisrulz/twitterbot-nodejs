// Global variables for use in the bot.
// Change these to suit your twitter account / goals.

var Global = {

    // your twitter username
    'myScreenName': 'yourUserName',
    'myID': 'e.g.1112293838440275970', // get it like this: https://www.wikihow.com/Find-Your-User-ID-on-Twitter 


    // hashtags, usernames and phrases to monitor:
    'hashtags': ['#winning', '#something', 'username', 'search string of something'], // A list of as many hashtags as you like.



    // your list of canned responses, the more you have the more flexible your reponses;
    //Futurebuilds will have 
    'quoteComment': [
        'Message 1',
        'Message 2',
        'Message 3',
        'Message 4',
        'Message 5',
        'Message 6'

    ],

    // Thankyou message for new  follower:
    'thanks': 'Thanks for following us!',

    'includeQuote': true, // change to false if you don't want to include a quote from 'quoteComment'  when thanking a new follower.

    //ratio of retweets to quoted tweets NOTE:quoted tweets with mentions can be spammy use in small amounts.
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