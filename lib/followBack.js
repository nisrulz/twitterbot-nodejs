const Twit = require('twit');
const T = new Twit(require('../config.js'));

var G = require('../globals');

module.exports = {
    thankyou: function () {
        console.log('Thanking New Followers ...')
        T.get('followers/list', function (error, data) {
            var quote = G.quoteComment[Math.floor(Math.random() * G.quoteComment.length)];
            if (!error) {


                if (G.followers === undefined) {
                    G.followers = reportBouncer(data.users.map(data => data.screen_name));
                    G.welcomeTweets = G.followers;
                    console.log('Stored followers, all new followers will be thanked while the bot is kept running!')
                }

                if (G.followers != []) {
                    G.welcomeTweets = reportBouncer(data.users.map(data => data.screen_name)).filter(function (id) {
                        return !G.followers.includes(id);
                    });
                    // update G.followers after getting new ids
                    G.followers = reportBouncer(data.users.map(data => data.screen_name));

                    if (G.welcomeTweets && G.welcomeTweets.length) {
                        console.log(G.welcomeTweets);
                    } else {
                        console.log('No new followers to thank!');
                    }

                }

                G.welcomeTweets.forEach(function (newFollower) {
                    if (G.includeQuote) {
                        var response = G.thanks + '. @' + newFollower + ' | ' + quote;
                    } else {
                        var response = G.thanks + '. @' + newFollower + '!'
                    }

                    // Post that tweet!
                    T.post('statuses/update', {
                        status: response
                    }, thanked)
                    console.log('Tweeted back to', newFollower);
                });


            } else {
                console.log('Error with follower grab', error);
            }


        })

    }
};

// Callback to make sure it worked!
function thanked(err, reply) {
    if (err !== undefined) {
        console.log(err.message);
    } else {
        console.log('Follower thanked sucessfully!');
    }
};



function reportBouncer(arr) {
    return arr.filter(Boolean);
};