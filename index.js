require('dotenv').config();
const axios = require('axios')
const cron = require('node-cron');
const { postTweet, postReply } = require('./twitterLib');
const TwitterListener = require('./TwitterListener');
const mentionListener = new TwitterListener(require('./credentials'))

async function getText(){
  const resp = await axios.get(`${process.env.AUTOMOTRON_BASE_URL}/api/generators/zuIF6oVUs/run`)
  return resp.data.text
}

async function scheduledTweet () {
  try{
    const text = await getText();
    console.log('Tweet =>', text)
    postTweet(text)    
  }catch(err){
    console.log('Error!', err)
  }

}

cron.schedule('0 7,8,9,10,11,12,13,14,15 * * *', scheduledTweet);

mentionListener.listenTo(['@deconfinatorex'])
mentionListener.on('tweet', async (tweet) => {
  console.log('Mention!', tweet.text)
  const text = await getText();
  console.log('reply =>', text)
  postReply(text, tweet);
})
mentionListener.startListening();
