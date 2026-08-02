from fastapi import APIRouter, HTTPException, status, Depends
from src.models.Academics import AcademicsModel
from src.routes.AuthRoute import get_current_user
from src.config.db import db
from src.utils.utils import get_response_object
import bson
from datetime import datetime
from src.services.redis_services import updateRedisCache

academicsCollection = db["academics"]
route = APIRouter(prefix="/api/v1/academics", tags=["Academics"])


@route.post("/")
async def addAcademics(academicData: AcademicsModel, userId=Depends(get_current_user)):
    academicData = academicData.model_dump()
    academicData["userId"] = userId
    usersAcademicData = await academicsCollection.find_one({"userId": userId})
    if usersAcademicData is None:
        academicsCollection.insert_one(academicData)
    else:
        academicsCollection.update_one({"userId": userId}, {"$set": academicData})
    await updateRedisCache(userId=userId)
    return get_response_object(
        message="Academic Data Updated Successfuly!", success=True, token=False
    )


@route.get("/")
async def getAcademicsData(userId=Depends(get_current_user)):

    academicData = await academicsCollection.find_one({"userId": userId})
    if academicData is not None:
        academicData["_id"] = str(academicData["_id"])

        academicData["academics"].sort(
            key=lambda p: (datetime.strptime(p["year"], "%Y")),
            reverse=True,
        )
    else:
        academicData["academics"] = []
    response = get_response_object(
        message="Academics Data fetch successfull!", success=True, token=False
    )
    response["data"] = academicData
    return response


# @route.put("/{expId}")
# async def getExperience(
#     expId: str, expData: ExperienceModel, userId=Depends(get_current_user)
# ):
#     expObjectId = bson.ObjectId(expId)
#     exp = await academicsCollection.find_one({"_id": expObjectId})
#     print(exp)
#     if exp is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail="No such record found"
#         )
#     data_dict = dict(expData)
#     # print(f"data_dict -> {data_dict['_id']}")
#     academicsCollection.update_one({"_id": expObjectId}, {"$set": data_dict})
#     await updateRedisCache(userId=userId)
#     response = get_response_object(
#         message="Experience Deleted successfully!", success=True, token=False
#     )

#     return response


# @route.delete("/{expId}")
# async def getExperience(expId: str, userId=Depends(get_current_user)):
#     expObjectId = bson.ObjectId(expId)
#     exp = await academicsCollection.find_one({"_id": expObjectId})
#     print(exp)
#     if exp is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail="No such record found"
#         )

#     academicsCollection.find_one_and_delete({"_id": expObjectId})

#     response = get_response_object(
#         message="Experience Deleted successfully!", success=True, token=False
#     )

#     return response
