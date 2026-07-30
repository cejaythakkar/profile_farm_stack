from fastapi import APIRouter, HTTPException, status
from src.config.db import db
from src.utils.utils import get_response_object
from src.services.profile_services import getProfileByUserName
from dotenv import load_dotenv
from src.config.redis import redis
import bson
import json

load_dotenv()


usersCollection = db["user"]
personalDetailsCollection = db["personal-info"]
experienceCollection = db["experience"]
projectsCollection = db["projects"]
skillsCollection = db["skills"]
route = APIRouter(prefix="/api/v1/profile", tags=["profile"])


@route.get("/{userName}")
async def getProfile(userName: str):
    print(userName)
    response = {"success": False, "message": "Something went wrong"}
    try:
        cache_key = f"profile:{userName}"
        cached_data = await redis.get(cache_key)
        if cached_data:
            print("=====Cache Hit=====")
            response = get_response_object(
                message="Personal Details fetched successfull!",
                success=True,
                token=False,
            )
            response["data"] = json.loads(cached_data)
            return response
        
        
        print("Cache Miss")
        profile_data = await getProfileByUserName(userName=userName)
        await redis.set(cache_key,json.dumps(profile_data,default=str))
        response["data"] = profile_data
    except Exception as e:
        # raise HTTPException(500, get_response_object(message="Something went wrong!", success=False, token=False))
        raise e
    else:
        return response


@route.get("/resumeDownload/{userName}")
async def resumeDownload(userName: str):
    return {}
