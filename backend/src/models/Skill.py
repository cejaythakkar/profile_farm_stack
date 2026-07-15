from pydantic import BaseModel, Field
from typing import Dict, List, Union

class SkillModel(BaseModel):
    userId: str
    skills: Dict[str, List[str]] = {}
    
class CreateSkillModel(BaseModel):
    skills: Dict[str, List[str]] = {}
    
