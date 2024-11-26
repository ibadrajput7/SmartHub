from pydantic import BaseModel, HttpUrl
from typing import Optional

# Request schema for note creation
class NoteCreate(BaseModel):
    title: Optional[str] = None
    source_type: str
    content: Optional[str] = None  # Used for text input
    youtube_link: Optional[HttpUrl] = None  # For YouTube input
    user_id: int

# Response schema
class NoteResponse(BaseModel):
    id: int
    title: Optional[str] = None
    source_type: str
    content: str

    class Config:
        orm_mode = True
