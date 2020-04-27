require('dotenv').config();
const axios = require('axios')
const cron = require('node-cron');
const { postTweet } = require('./twitterLib');


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
scheduledTweet()
cron.schedule('0 7,8,9,10,11,12,13,14,15 * * *', scheduledTweet);
