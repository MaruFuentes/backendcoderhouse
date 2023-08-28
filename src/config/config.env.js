import {config} from 'dotenv';

config({
    path:'./.env'
});



export default{
    PORT: process.env.PORT,
    MONGO_URL : process.env.MONGO_URL,
    githubClientID:process.env.CLIENT_ID,
  githubClientSecret:process.env.CLIENT_SECRET,
}