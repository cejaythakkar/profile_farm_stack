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
careerHilightsCollection = db["career-highlights"]
academicsCollection = db["academics"]


async def getProfileData(userId: str):
    personalDetails = await personalDetailsCollection.find_one(
        {"userId": userId}, {"_id": 0}
    )
    skills = await skillsCollection.find_one({"userId": userId}, {"_id": 0})
    experience = await getExperiencesSortedByCompanysJoiningDate(userId=userId)
    projects = await getProjectsSortedByCompanysJoiningDate(userId=userId)
    careerHighlights = await careerHilightsCollection.find_one(
        {"userId": userId}, {"_id": 0}
    )
    academicsData = await academicsCollection.find_one({"userId": userId}, {"_id": 0})
    profile_data = {
        "personalDetails": personalDetails,
        "skills": skills,
        "experiences": experience,
        "projects": projects,
        "careerHighlights": careerHighlights,
        "currentStatus": experience[0],
        "academics": academicsData,
    }
    return profile_data


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
    profileData = await getProfileData(userId=userDetails["_id"])
    profileData["userDetails"] = userDetails
    return profileData


async def getProfileByUserName(userName: str):
    userDetails = await usersCollection.find_one(
        {"userName": userName}, {"password": 0}
    )
    if userDetails == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with the name {userName} not found!",
        )

    userDetails["_id"] = str(userDetails["_id"])
    profileData = await getProfileData(userId=userDetails["_id"])
    profileData["userDetails"] = userDetails
    return profileData
