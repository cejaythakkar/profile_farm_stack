from fastapi import APIRouter, HTTPException, status, Depends
from src.models.Experience import ExperienceModel
from src.routes.AuthRoute import get_current_user
from src.config.db import db
from src.utils.utils import get_response_object
import bson
from datetime import datetime
from src.services.redis_services import updateRedisCache

experienceCollection = db["experience"]
route = APIRouter(prefix="/api/v1/experience", tags=["Experience"])


@route.post("/")
async def addExperience(expData: ExperienceModel, userId=Depends(get_current_user)):
    expData = expData.model_dump()
    expData["userId"] = userId

    experienceCollection.insert_one(expData)
    await updateRedisCache(userId=userId)
    return get_response_object(
        message="Experience added successfuly!", success=True, token=False
    )


@route.get("/")
async def getExperience(userId=Depends(get_current_user)):

    cursor = experienceCollection.find({"userId": userId})
    expData = await cursor.to_list(length=1000)
    for exp in expData:
        if "_id" in exp:
            exp["_id"] = str(exp["_id"])

    expData.sort(
        key=lambda p: (datetime.strptime(p["fromDate"], "%b-%Y")),
        reverse=True,
    )
    response = get_response_object(
        message="Experiences fetch successfull!", success=True, token=False
    )
    response["data"] = expData
    return response


@route.put("/{expId}")
async def getExperience(
    expId: str, expData: ExperienceModel, userId=Depends(get_current_user)
):
    expObjectId = bson.ObjectId(expId)
    exp = await experienceCollection.find_one({"_id": expObjectId})
    print(exp)
    if exp is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No such record found"
        )
    data_dict = dict(expData)
    # print(f"data_dict -> {data_dict['_id']}")
    experienceCollection.update_one({"_id": expObjectId}, {"$set": data_dict})
    await updateRedisCache(userId=userId)
    response = get_response_object(
        message="Experience Deleted successfully!", success=True, token=False
    )

    return response


@route.delete("/{expId}")
async def getExperience(expId: str, userId=Depends(get_current_user)):
    expObjectId = bson.ObjectId(expId)
    exp = await experienceCollection.find_one({"_id": expObjectId})
    print(exp)
    if exp is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No such record found"
        )

    experienceCollection.find_one_and_delete({"_id": expObjectId})

    response = get_response_object(
        message="Experience Deleted successfully!", success=True, token=False
    )

    return response
