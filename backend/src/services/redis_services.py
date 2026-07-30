from src.config.redis import redis
from src.services.profile_services import getProfileDataByUserId
import json

async def updateRedisCache(userId:str):
    print('Updating Redis Cache')
    profile_data = await getProfileDataByUserId(userId=userId)
    cache_key = f"profile:{profile_data['userDetails']['userName']}"
    await redis.set(cache_key,json.dumps(profile_data,default=str))

