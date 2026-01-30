const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URI || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function startRedis() {
    await redisClient.connect();
    console.log('Connected to Redis');
}

module.exports = { redisClient, startRedis };