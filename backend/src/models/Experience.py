from pydantic import BaseModel, Field
from datetime import date

class ExperienceModel(BaseModel):
    userId: str
    company: str = Field(...,description="Company is Required")
    formDate: date = Field(...,description="From Date is Required")
    toDate: date
    position: str = Field(...,description="Position is Required")
    roles_responsibilities : str = Field(...,description="Roles and Responsibilities is Required")
    