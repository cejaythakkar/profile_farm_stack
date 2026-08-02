from src.config.db import db
from datetime import datetime

experiencesCollection = db["experience"]
async def getExperiencesSortedByCompanysJoiningDate(userId:str):
    print('called...')
    cursor = experiencesCollection.find({"userId": userId})
    expData = await cursor.to_list(length=1000)
    for exp in expData:
        if "_id" in exp:
            exp["_id"] = str(exp["_id"])

    expData.sort(
        key=lambda p: (
            datetime.strptime(p["fromDate"], "%b-%Y")
        ),
        reverse=True,
    )
    
    return expData