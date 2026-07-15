from fastapi import APIRouter, HTTPException, status, Depends
from src.models.Skill import SkillModel
from src.routes.AuthRoute import get_current_user
from src.config.db import db
from src.utils.utils import get_response_object

skillsCollection = db["skills"]
route = APIRouter(prefix="/api/v1/skills",tags=["Skills"])


@route.post("/")
async def addSkills(skillsData: SkillModel, userId=Depends(get_current_user)):
    skillsData = skillsData.model_dump()
    skillsData["userId"] = userId
    skillsCollection.insert_one(skillsData)
    return get_response_object(
        message="Skills added successfuly!", success=True, token=False
    )


@route.get("/")
async def addSkills(userId=Depends(get_current_user)):

    skillsData = await skillsCollection.find_one({"userId": userId})
    skillsData["_id"] = str(skillsData["_id"])
    response = get_response_object(
        message="skills fetch successfull!", success=True, token=False
    )
    response["data"] = skillsData
    return response
