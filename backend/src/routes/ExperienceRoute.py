from fastapi import APIRouter, HTTPException, status, Depends
from src.models.Experience import ExperienceModel
from src.routes.AuthRoute import get_current_user
from src.config.db import db
from src.utils.utils import get_response_object

experienceCollection = db["experience"]
route = APIRouter(prefix="/api/v1/experience",tags=["Experience"])


@route.post("/")
async def addExperience(expData: ExperienceModel, userId=Depends(get_current_user)):
    expData = expData.model_dump()
    expData["userId"] = userId
    expData["formDate"] = expData["formDate"].isoformat()
    expData["toDate"] = expData["toDate"].isoformat()
    
    experienceCollection.insert_one(expData)
    return get_response_object(
        message="Experience added successfuly!", success=True, token=False
    )


@route.get("/")
async def getExperience(userId=Depends(get_current_user)):

    expData = await experienceCollection.find_one({"userId": userId})
    expData["_id"] = str(expData["_id"])
    response = get_response_object(
        message="skills fetch successfull!", success=True, token=False
    )
    response["data"] = expData
    return response
