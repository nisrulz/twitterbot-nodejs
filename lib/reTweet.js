const Twit = require('twit');
const T = new Twit(require('../config.js'));
var G = require('../globals');


module.exports = {
    now: function () {
        console.log('Running Tweet Cycle...');
        // Randomly select the hashtag to search
        var hash = G.hashtags[Math.floor(Math.random() * G.hashtags.length)];
        var quote = G.quoteComment[Math.floor(Math.random() * G.quoteComment.length)];
        //generate the search object:
        var hashtagSearch = {
            q: hash,
            count: 60,
            result_type: 'recent'
        };
        console.log('searching : ', hash);



        // Search twitter using the randomly chosen hashtag:

        T.get('search/tweets', hashtagSearch, function (error, data) {

            G.data = data;
            G.newFollowList = reportBouncer(data.statuses.filter(data => data.user.following != true).map(data => data.user.id_str));

            console.log(G.newFollowList);
            var tweets = data.statuses.filter(data => data.user.screen_name != G.myScreenName); // remove any tweets already sent by you from search
            console.log(data.statuses.length);
            console.log(tweets.length);


            var randomisedTweet = [Math.floor(Math.random() * tweets.length)]

            // console.log(tweets[randomisedTweet]);


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

                    // Randomise retweet to quote tweet ratio mentions can be *spammy* so be careful set 
                    var reTweet = Math.random() < G.RetweetQuoteRatio;




                    if (reTweet) {
                        // Retweet
                        T.post('statuses/retweet/' + retweetId, {}, retweeted);
                    } else {
                        // Quote Tweet with @mention of original user
                        T.post('statuses/update', {
                            status: '@' + mention + ' ' + quote + ' https://twitter.com/TwitterDev/statuses/' + retweetId
                        }, quoted);
                    }





                } else {
                    if (debug) {
                        console.log('There was an error with your hashtag search:', error)
                    }
                }
            } else {
                console.log('No tweets found on hashtag');

            }

        });
    }
}

// Callback retweet to make sure it worked!
function retweeted(err, reply) {
    if (err !== undefined) {
        console.log(err.message);
    } else {
        console.log('retweeted sucessfully!');
    }
}

// Callback on quoted to make sure it worked!
function quoted(err, reply) {
    if (err !== undefined) {
        console.log(err.message);
    } else {
        console.log('quoted tweet sucessfully!');
    }
}



function reportBouncer(arr) {
    return arr.filter(Boolean);
};