from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date


class AcademicModel(BaseModel):
    year: str = Field(..., description="Company is Required")
    course: str = Field(..., description="From Date is Required")
    grades: str = Field(..., description="From Date is Required")
    college: str = Field(..., description="Position is Required")
    collegeUrl: Optional[str] = Field(None)
    university: str = Field(..., description="Roles and Responsibilities is Required")


class AcademicsModel(BaseModel):
    academics: List[AcademicModel]
