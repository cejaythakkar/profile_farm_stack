from fastapi import APIRouter, HTTPException, status
from src.config.db import db
from src.utils.utils import get_response_object
from dotenv import load_dotenv
import bson

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
        userDetails = await usersCollection.find_one(
            {"userName": userName}, {"password": 0}
        )
        print(userDetails)
        if userDetails == None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with the name {userName} not found!",
            )

        userDetails["_id"] = str(userDetails["_id"])

        personalDetails = await personalDetailsCollection.find_one(
            {"userId": userDetails["_id"]}, {"_id": 0}
        )
        skills = await skillsCollection.find_one(
            {"userId": userDetails["_id"]}, {"_id": 0}
        )
        experience = experienceCollection.find(
            {"userId": userDetails["_id"]}, {"_id": 0}
        )
        experience = await experience.to_list(length=100);
        projects = projectsCollection.find(
            {"userId": userDetails["_id"]}, {"_id": 0}
        )
        projects = await projects.to_list(length=100);

        response = get_response_object(
            message="Personal Details fetched successfull!", success=True, token=False
        )
        response["data"] = {
            "userDetails": userDetails,
            "personalDetails": personalDetails,
            "skills": skills,
            "experiences": experience,
            "projects": projects,
        }
    except Exception as e:
        # raise HTTPException(500, get_response_object(message="Something went wrong!", success=False, token=False))
        raise e
    else:
        return response
