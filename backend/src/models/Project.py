from pydantic import BaseModel, Field, model_validator
from typing import Optional
from datetime import date


class ProjectModel(BaseModel):
    title: str = Field(..., description="project title is Required")
    isPersonal: bool = Field(False)
    company: Optional[str] = Field(None)

    @model_validator(mode="after")
    def check_company_if_not_personal(self):
        # If isPersonal is False, company must not be empty or None
        if not self.isPersonal and not self.company:
            raise ValueError("Company is required when the project is not personal")
        return self

    domain: Optional[list[dict]] = Field([])
    role: Optional[str] = Field(None)
    technology: Optional[list[dict]] = Field([])
    link: Optional[str] = Field(None)
    githubRepo: Optional[str] = Field(None)
    contributions: str = Field(...,description="Project contributions is required")
    
