from pydantic import BaseModel, Field
from datetime import date

class ExperienceModel(BaseModel):
    company: str = Field(...,description="Company is Required")
    fromDate: str = Field(...,description="From Date is Required")
    toDate: str = Field(...,description="From Date is Required")
    position: str = Field(...,description="Position is Required")
    roles_responsibilities : str = Field(...,description="Roles and Responsibilities is Required")
    