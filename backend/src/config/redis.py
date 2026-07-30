from redis.asyncio import Redis

redis = Redis(host="localhost", port=6381, decode_responses=True)
