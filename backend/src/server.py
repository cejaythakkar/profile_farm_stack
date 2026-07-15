from fastapi import FastAPI,HTTPException
from fastapi.responses import JSONResponse
from src.routes.PublicRoute import route as public_route
from src.routes.AuthRoute import route as auth_route
from src.routes.SkillsRoute import route as skills_route
from src.routes.ExperienceRoute import route as experience_route
from src.routes.PersonalDetails import route as personalDetails_route
from src.routes.ProfileRoute import route as profile_route


from fastapi.middleware.cors import CORSMiddleware

server = FastAPI()
origins = ["http://localhost:4173","http://localhost:5173"]
server.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@server.exception_handler(HTTPException)
async def custom_http_exception_handler(request,execption):
    return JSONResponse(status_code=execption.status_code,content={
        "success":False,
        "data":{},
        "message":execption.detail
    }
                        )
server.include_router(public_route)
server.include_router(auth_route)
server.include_router(skills_route)
server.include_router(experience_route)
server.include_router(personalDetails_route)
server.include_router(profile_route)
