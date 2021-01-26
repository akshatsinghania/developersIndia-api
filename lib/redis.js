const redis = require("redis");
const { promisify } = require('util')

const client = redis.createClient ({
    host : process.env.REDIS_URI,
    port : process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

const GET_ASYNC = promisify(client.get).bind(client)
const SET_ASYNC = promisify(client.set).bind(client)

client.on("connect", ()=> {
    console.log('Client connected to redis');
});

client.on("error", (error)=> {
  console.error(error.message);
});
 
// client.set("key", "value", redis.print);
// client.get("key", redis.print);

module.exports = {client,GET_ASYNC,SET_ASYNC};