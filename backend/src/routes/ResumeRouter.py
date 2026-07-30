from fastapi import APIRouter
from fastapi.responses import Response
from src.services.resume_services import generate_resume

router = APIRouter(prefix="/api/v1/resume",tags=["resume"])

@router.get("/{userName}")
async def download_resume(userName: str):
    pdf = await generate_resume(userName=userName)
    
    return Response(
        content=pdf,
        headers={
            "Content-Disposition": f'attachment; filename="{userName}.pdf"'
        },
        media_type="application/pdf"
    )