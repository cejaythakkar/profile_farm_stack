from fastapi import APIRouter, HTTPException, status, Depends
from src.models.Project import ProjectModel
from src.routes.AuthRoute import get_current_user
from src.config.db import db
from src.utils.utils import get_response_object
import bson

projectsCollection = db["projects"]
route = APIRouter(prefix="/api/v1/projects", tags=["Projects"])


@route.post("/")
async def addProject(projectData: ProjectModel, userId=Depends(get_current_user)):
    projectData = projectData.model_dump()
    print(projectData)
    projectData["userId"] = userId

    projectsCollection.insert_one(projectData)
    return get_response_object(
        message="Experience added successfuly!", success=True, token=False
    )


@route.get("/")
async def getProjects(userId=Depends(get_current_user)):

    cursor = projectsCollection.find({"userId": userId})
    expData = await cursor.to_list(length=1000)
    for exp in expData:
        if "_id" in exp:
            exp["_id"] = str(exp["_id"])

    response = get_response_object(
        message="Experiences fetch successfull!", success=True, token=False
    )
    response["data"] = expData
    return response

@route.put("/{projectId}")
async def getExperience(projectId: str,projectData: ProjectModel, userId=Depends(get_current_user)):
    projectObjectId = bson.ObjectId(projectId)
    exp = await projectsCollection.find_one({"_id": projectObjectId})
    print(exp)
    if exp is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No such record found"
        )
    data_dict = dict(projectData)
    # print(f"data_dict -> {data_dict['_id']}")
    projectsCollection.update_one({"_id": projectObjectId}, {"$set": data_dict})

    response = get_response_object(
        message="Project Updated successfully!", success=True, token=False
    )

    return response

@route.delete("/{projectId}")
async def getExperience(projectId: str, userId=Depends(get_current_user)):
    projectObjectId = bson.ObjectId(projectId)
    project = await projectsCollection.find_one({"_id": projectObjectId})
    print(project)
    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No such Project found"
        )

    projectsCollection.find_one_and_delete({"_id": projectObjectId})

    response = get_response_object(
        message="Experience Deleted successfully!", success=True, token=False
    )

    return response
