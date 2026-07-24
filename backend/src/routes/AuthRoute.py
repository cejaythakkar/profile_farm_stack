from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from src.models.User import User as UserModel, LoginModel
from dotenv import load_dotenv
from src.config.db import db
from bcrypt import gensalt, hashpw, checkpw
import jwt
import os
import bson
load_dotenv()
JWT_AUTH_SECRET = os.getenv('JWT_AUTH_SECRET')
authCollection = db["user"]
personalDetailsCollection = db["personal-info"]

route = APIRouter(prefix="/api/v1/auth",tags=["Auth"])

security = HTTPBearer()

async def get_current_user(credentials:HTTPAuthorizationCredentials=Depends(security)):
    # return credentials.credentials
    try:
        token = credentials.credentials
        payload = jwt.decode(token,JWT_AUTH_SECRET,algorithms=["HS256"])
        return payload["userId"]
    except Exception as exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid Token!")


@route.post("/register")
async def registerUser(userData: UserModel):
    userData = userData.model_dump()

    user = await authCollection.find_one({"email": userData["email"]})

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,detail="Email already exists!"
        )
        
    user = await authCollection.find_one({"userName": userData["userName"]})

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,detail="User Name has already been taken!"
        )

    salt = gensalt(10)
    userData["password"] = hashpw(userData["password"].encode(), salt).decode()
    try:
        document = await authCollection.insert_one(userData)
        # 7/0
    except Exception as exception:
        print(exception)
        return {
            "message": "something went wrong while registering user",
            "success": False,
            "data": {},
        }
    else:
        inserted_document = await authCollection.find_one({"_id": document.inserted_id},{"password":0})
        personalDetailsData = {"userId" :  str(inserted_document["_id"]),"email" : inserted_document["email"],"name" : inserted_document["name"]}
        await personalDetailsCollection.insert_one(personalDetailsData)
        print(f"inserted_document : {inserted_document}")
        inserted_document["_id"] = str(inserted_document["_id"])
        token = jwt.encode({"userId":inserted_document["_id"]},JWT_AUTH_SECRET,algorithm="HS256")
        return {
            "message": "user registered!",
            "success": True,
            "token": token,
        }


@route.post("/login")
async def loginUSer(userData: LoginModel):
    userData = userData.model_dump()

    user = await authCollection.find_one({"userName": userData["userName"]})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,detail="User doesn't exists!"
        )
    else:
        
        match = checkpw(userData['password'].encode(),user['password'].encode())
        if not match:
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,detail="Bad password!"
        )
       
        del user['password']
        user["_id"] = str(user["_id"])
        
        token = jwt.encode({"userId":user["_id"]},JWT_AUTH_SECRET,algorithm="HS256")
        return {
            "message": "Login successful!",
            "success": True,
            "token": token
        }
        # print(userData)

@route.get("/profile")
async def userProfile(userId:str = Depends(get_current_user)):
    user = await authCollection.find_one({"_id" : bson.ObjectId(userId)},{"password":0})
    # print(f"user {user}")
    user["_id"] = str(user["_id"])
    return {  "message": "Profile fetched successfully!",
            "success": True,
            "data": user}