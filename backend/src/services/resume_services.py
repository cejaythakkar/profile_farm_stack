from src.services.profile_services import getProfileByUserName
from src.resume.resume_generator import generateResume

async def generate_resume(userName:str):
    profile = await getProfileByUserName(userName=userName)
    pdf = await generateResume(profile)
    return pdf