const redis = require("redis");

const client = redis.createClient({
  host: process.env.REDIS_HOST || "127.0.0.1",
});

(async () => {
  try {
    await client.connect();
    console.log("Redis connected!");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    process.exit(1);
  }
})();

client.on("connect", () => {
  console.log("Connected to Redis!");
});

client.on("error", (err) => {
  console.error("Error in the Redis connection:", err);
});

module.exports = client;
