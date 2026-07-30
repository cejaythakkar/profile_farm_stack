from fastapi import APIRouter, HTTPException, status, Depends
from src.models.Project import ProjectModel, ProjectModelEdit
from src.routes.AuthRoute import get_current_user
from src.config.db import db
from src.utils.utils import get_response_object
import bson
from src.services.projects_services import getProjectsSortedByCompanysJoiningDate
from src.services.redis_services import updateRedisCache
from datetime import datetime

projectsCollection = db["projects"]
experienceCollection = db["experience"]
route = APIRouter(prefix="/api/v1/projects", tags=["Projects"])


@route.post("/")
async def addProject(projectData: ProjectModel, userId=Depends(get_current_user)):
    projectData = projectData.model_dump()
    company_details = {}
    if projectData["isPersonal"] is False:
        company_details = await experienceCollection.find_one(
            {"_id": bson.ObjectId(projectData["company"]["_id"])},
            {"roles_responsibilities": 0, "position": 0},
        )
        if company_details is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="No such company found"
            )
        company_details["_id"] = str(company_details["_id"])

    projectData["userId"] = userId
    projectData["company"] = company_details
    projectsCollection.insert_one(projectData)
    await updateRedisCache(userId=userId)
    return get_response_object(
        message="Experience added successfuly!", success=True, token=False
    )


@route.get("/")
async def getProjects(userId=Depends(get_current_user)):

    projectsData = await getProjectsSortedByCompanysJoiningDate(userId=userId)

    response = get_response_object(
        message="Experiences fetch successfull!", success=True, token=False
    )
    response["data"] = projectsData
    return response


@route.put("/{projectId}")
async def getExperience(
    projectId: str, projectData: ProjectModelEdit, userId=Depends(get_current_user)
):
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
    await updateRedisCache(userId=userId)
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


@route.get("/companies")
async def getCompanies(userId=Depends(get_current_user)):
    user_companies_cursor = experienceCollection.find(
        {"userId": userId}, {"_id": 1, "company": 1}
    )
    user_companies = await user_companies_cursor.to_list(length=100)
    for company in user_companies:
        company["_id"] = str(company["_id"])
    response = get_response_object(
        message="user companies fetch successfull!", success=True, token=False
    )
    response["data"] = user_companies
    return response
