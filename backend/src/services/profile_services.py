from fastapi import HTTPException, status
from src.config.db import db
import bson
from src.services.projects_services import getProjectsSortedByCompanysJoiningDate
from src.services.experiences_services import getExperiencesSortedByCompanysJoiningDate
usersCollection = db["user"]
personalDetailsCollection = db["personal-info"]
experienceCollection = db["experience"]
projectsCollection = db["projects"]
skillsCollection = db["skills"]


async def getProfileDataByUserId(userId: str):
    userDetails = await usersCollection.find_one(
        {"_id": bson.ObjectId(userId)}, {"password": 0}
    )
    if userDetails == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with the name {userId} not found!",
        )

    userDetails["_id"] = str(userDetails["_id"])
    personalDetails = await personalDetailsCollection.find_one(
        {"userId": userDetails["_id"]}, {"_id": 0}
    )
    skills = await skillsCollection.find_one({"userId": userDetails["_id"]}, {"_id": 0})
    experience = experienceCollection.find({"userId": userDetails["_id"]}, {"_id": 0})
    experience = await experience.to_list(length=100)
    projects = projectsCollection.find({"userId": userDetails["_id"]}, {"_id": 0})
    projects = await projects.to_list(length=100)

    profile_data = {
        "userDetails": userDetails,
        "personalDetails": personalDetails,
        "skills": skills,
        "experiences": experience,
        "projects": projects,
    }
    return profile_data

async def getProfileByUserName(userName:str):
    userDetails = await usersCollection.find_one(
        {"userName": userName}, {"password": 0}
    )
    if userDetails == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with the name {userName} not found!",
        )

    userDetails["_id"] = str(userDetails["_id"])
    personalDetails = await personalDetailsCollection.find_one(
        {"userId": userDetails["_id"]}, {"_id": 0}
    )
    skills = await skillsCollection.find_one({"userId": userDetails["_id"]}, {"_id": 0})
    # experience = experienceCollection.find({"userId": userDetails["_id"]}, {"_id": 0})
    # experience = await experience.to_list(length=100)
    experience = await getExperiencesSortedByCompanysJoiningDate(userId=userDetails["_id"])
    projects = await getProjectsSortedByCompanysJoiningDate(userId=userDetails["_id"])
    
    profile_data = {
        "userDetails": userDetails,
        "personalDetails": personalDetails,
        "skills": skills,
        "experiences": experience,
        "projects": projects,
    }
    return profile_data