from fastapi import APIRouter, HTTPException, status, Depends,Form, File, UploadFile
from src.routes.AuthRoute import get_current_user
from src.config.db import db
from src.utils.utils import get_response_object
from src.services.redis_services import updateRedisCache
from typing import Optional # Import this for optional type hints
import json
import cloudinary
import cloudinary.uploader 
import os
from dotenv import load_dotenv
load_dotenv()


personalInfoCollection = db["personal-info"]
route = APIRouter(prefix="/api/v1/personal-info",tags=["personal-info"])

cloudinary.config( 
    cloud_name = os.getenv("CLOUDINERY_CLOUD_NAME"),
    api_key = os.getenv("CLOUDINERY_API_KEY"),
    api_secret = os.getenv("CLOUDINERY_API_SECRET"),
    secure = True
)

@route.post("/")
async def updatePersonalDetails( personalDetails: str = Form(...),
    profileImage: Optional[UploadFile] = File(None),
    userId = Depends(get_current_user)):
    
    data_dict = json.loads(personalDetails)
    
    if profileImage:
        try:
            # Read the incoming file content into raw in-memory bytes
            image_bytes = await profileImage.read()
            
            # Send the raw bytes straight to Cloudinary
            upload_result = cloudinary.uploader.upload(
                image_bytes,
                folder = "user_profiles",       # Automatically creates this folder in Cloudinary
                invalidate=True,
                public_id = f"user_{userId}"    # Overwrites previous photos for this specific user
            )
            
            # Extract the secure HTTPS URL from Cloudinary's response dictionary
            data_dict["profileImage"] =  upload_result.get("secure_url")
            print(f"Cloudinary URL generated: {data_dict['profileImage']}")

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Cloudinary upload failed: {str(e)}")
    
    # user_document = personalDetails.model_dump()
    result = await personalInfoCollection.find_one({"userId": userId})
    if(result):
        personalInfoCollection.update_one({"userId": userId}, {"$set": data_dict})
    else:
        data_dict["userId"] = userId
        personalInfoCollection.insert_one(data_dict)
    await updateRedisCache(userId=userId)
    return get_response_object(
        message="Personal details updated successfuly!", success=True, token=False
    )

@route.get("/")
async def getPersonalDetails(userId=Depends(get_current_user)):

    expData = await personalInfoCollection.find_one({"userId": userId})
    
    expData["_id"] = str(expData["_id"])
    response = get_response_object(
        message="Personal Details fetched successfull!", success=True, token=False
    )
    response["data"] = expData
    return response