from src.config.db import db
projectsCollection = db["projects"]
from datetime import datetime
async def getProjectsSortedByCompanysJoiningDate(userId:str):
    
    cursor = projectsCollection.find({"userId": userId})
    projectsData = await cursor.to_list(length=1000)
    for exp in projectsData:
        if "_id" in exp:
            exp["_id"] = str(exp["_id"])

    projectsData.sort(
        key=lambda p: (
            datetime.strptime(p["company"]["fromDate"], "%b-%Y")
            if p["company"]
            else datetime.min
        ),
        reverse=True,
    )
    
    return projectsData