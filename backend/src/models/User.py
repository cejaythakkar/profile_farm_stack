from pydantic import BaseModel, Field, EmailStr
from datetime import date, datetime


class User(BaseModel):
    name: str = Field(..., description="Name is Required")
    email: EmailStr = Field(..., description="Email is Required")
    userName: str = Field(..., description="Email is Required")
    password: str = Field(..., description="Password is Required")
    created_at: datetime = Field(default_factory=datetime.now)


class LoginModel(BaseModel):
    userName: str = Field(..., description="Email is Required")
    password: str = Field(..., description="Password is Required")
