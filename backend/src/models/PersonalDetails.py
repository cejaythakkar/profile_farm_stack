from pydantic import BaseModel, Field, field_validator
from fastapi import UploadFile
from datetime import date


class Language(BaseModel):
    label: str
    value: str


class Hobby(BaseModel):
    label: str
    value: str


class contactDetails(BaseModel):
    type: str
    number: str


class socialMedia(BaseModel):
    type: str
    link: str


class PersonalDetails(BaseModel):
    name: str = Field(..., description="Name is Required")
    dob: str = Field(..., description="Date of Birth is Required")
    email: str = Field(..., description="Email is Required")
    address: str = Field(..., description="Address is Required")
    nationality: str = Field(..., description="Nationality is Required")
    languagesKnown: list[Language]
    hobbies: list[Hobby]
    socialMedia: list[socialMedia]
    contactDetails: list[contactDetails]
    

    # @field_validator("profile_image")
    # @classmethod
    # def validate_image_type(cls, file: UploadFile) -> UploadFile:
    #     allowed_types = ["image/jpeg", "image/png"]
    #     if file.content_type not in allowed_types:
    #         raise ValueError("Only JPEG or PNG images are allowed.")
    #     return file
