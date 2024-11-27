from pydantic import BaseModel, HttpUrl, Field
from typing import Optional, List

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


class Note(BaseModel):
    """Structure for individual notes"""
    title: str = Field(description="Note section title")
    content: str = Field(description="Main content of note")
    keywords: List[str] = Field(description="Key terms from note")
    importance_score: float = Field(ge=0, le=1, description="Importance score between 0-1")

class NotesOutput(BaseModel):
    """Structure for complete notes output"""
    notes: List[Note]
    summary: str
    total_score: float
    feedback: Optional[str] = None

