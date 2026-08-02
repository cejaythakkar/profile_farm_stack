from pydantic import BaseModel
from typing import Dict, List

class CareerHighlightsModel(BaseModel):
    title: List[Dict] = []
    summary : str
    
