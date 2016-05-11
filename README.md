#**TwitterBot-NodeJS**

Yeah it pretty much does what it says in the title. Its a twitter bot which can post tweets, retweet other tweets and possibly fav tweets.

Simple.Easy.Cute (Ok, last one didnot go with the flow..) 

> It attempts to retweet once per hour


##Installation

+ Install [Node.js](http://nodejs.org/)
+ Clone this repo
 
	```bash
	  git clone https://github.com/nisrulz/twitterbot-nodejs.git
	```
+ Run 
	```bash
	npm install
	```

	> It will install [Twit](https://github.com/ttezel/twit), the library that lets us talk to Twitter.

##Connecting to Twitter

1. Register a Twitter account and also get its "app info".
	>Twitter doesn't allow you to register multiple twitter accounts on the same email address. I recommend you create a brand new email address (perhaps using Gmail) for the Twitter account. Once you register the account to that email address, wait for the confirmation email.

1. Now go [here](https://dev.twitter.com/apps/new) and log in as the Twitter account for your bot:
1. Fill up the form and submit.
1. Next once the submission completes you will be taken to a page which has the 
	+ "Settings" tab : Update details here
	+ "Permissons" tab :  Enable `Read and Write` 
	+ "Key and Access Token" tab : Click on `Create my access token`. 
1. Use the generated tokens in the "Key and Access Token" tab to fill the fields under the `config.js` file in your app directory.
	It should look like this:

	```javascript
	module.exports = {
	  consumer_key:         'blah',
	  consumer_secret:      'blah',
	  access_token:         'blah',
	  access_token_secret:  'blah'
	}
	```
1. Update the code under `bot.js` , with the your values. Best of all modify the code, tinker with it.
1. Now type the following in the command line in your project directory:

	```bash
	node bot.js
	```

Hopefully at this point you see a message like "Success! Check your bot, it should have retweeted something." 

Check the Twitter account for your bot, and it should have retweeted a tweet with the provided hashtag.


###**Whats Next**

You might want to push this app to a running server , probably [heroku](https://www.heroku.com/).

> Note : Heroku servers would go back to sleep if there is no activity after some time, so you can have a look at [Kaffeine](https://kaffeine.herokuapp.com/) , to keep your server active.

-
> Do not misuse the twitter api to spam or burden the server load for twitter api , as twitter follows a strict rule of closing down accounts that do that. Please read [here for the rules](https://support.twitter.com/articles/18311)

License
=======

    Copyright 2016 Nishant Srivastava

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

