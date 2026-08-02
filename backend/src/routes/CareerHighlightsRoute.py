from fastapi import APIRouter, HTTPException, status, Depends
from src.models.CareerHighlights import CareerHighlightsModel
from src.routes.AuthRoute import get_current_user
from src.config.db import db
from src.utils.utils import get_response_object
from src.services.redis_services import updateRedisCache

careerHilightsCollection = db["career-highlights"]
route = APIRouter(prefix="/api/v1/career-highlights",tags=["career-highlights"])


@route.post("/")
async def addUpdateCareerHighlights(careerhighlightsData: CareerHighlightsModel, userId=Depends(get_current_user)):
    careerhighlightsData = careerhighlightsData.model_dump()
    careerhighlightsData["userId"] = userId
    careerHighlightsData = await careerHilightsCollection.find_one({"userId":userId})
    if careerHighlightsData is None:
        careerHilightsCollection.insert_one(careerhighlightsData)
    else:
        careerHilightsCollection.update_one({"userId":userId},{"$set":careerhighlightsData})
        await updateRedisCache(userId=userId)
    return get_response_object(
        message="Career Highlights Updated successfuly!", success=True, token=False
    )


@route.get("/")
async def getCareerHighlightsData(userId=Depends(get_current_user)):

    careerHighlightsData = await careerHilightsCollection.find_one({"userId": userId})
    careerHighlightsData["_id"] = str(careerHighlightsData["_id"])
    response = get_response_object(
        message="Career Highlights fetch successfull!", success=True, token=False
    )
    response["data"] = careerHighlightsData
    return response
