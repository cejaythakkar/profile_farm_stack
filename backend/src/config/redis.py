from redis.asyncio import Redis
import os

REDIS_HOST = os.getenv("REDIS_HOST", "redis")

redis = Redis(host=REDIS_HOST, port=6381, decode_responses=True)
