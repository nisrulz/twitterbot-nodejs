const Twit = require('twit');
const T = new Twit(require('../config.js'));

var G = require('../globals');


module.exports = {
    users: function () {
        console.log('Running Follow New Users...');
        // Randomly select the hashtag to search
        var hash = G.hashtags[Math.floor(Math.random() * G.hashtags.length)];

        //generate the search object:
        var hashtagSearch = {
            q: hash,
            count: 60,
            result_type: 'recent'
        };


        // Search twitter using the randomly chosen hashtag:

        T.get('search/tweets', hashtagSearch, function (error, data) {

            if (error) {
                console.log(error);
                return;
            }

            G.data = data;
            let L = reportBouncer(data.statuses.filter(data => data.user.following != true).map(data => data.user.id_str));
            G.newFollowList = L.filter(id => id != G.myID);
            // console.log('new unfollowed IDs : ', G.newFollowList);
            var randomisedFollow = G.newFollowList[Math.floor(Math.random() * G.newFollowList.length)];
            //  console.log('chosen follow: ', randomisedFollow);

            if (randomisedFollow === undefined) {
                console.log('No New Follow Found')
            } else {

                T.post('friendships/create', {
                    'user_id': randomisedFollow,
                    'follow': true
                }, followed);
                console.log('Followed', randomisedFollow);
            };
        });
    }
};


// Callback to make sure it worked!
function followed(err, reply) {
    if (err !== undefined) {
        console.log(err.message);
    } else {
        console.log('Followed new user sucessfully!');
    }
};


function reportBouncer(arr) {
    return arr.filter(Boolean);
};