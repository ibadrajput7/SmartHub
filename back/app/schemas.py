from pydantic import BaseModel, HttpUrl, Field
from typing import Optional, List

class NoteCreate(BaseModel):
    title: Optional[str] = None
    source_type: str
    content: Optional[str] = None  
    youtube_link: Optional[HttpUrl] = None  
    user_id: int

class NoteResponse(BaseModel):
    id: int
    title: Optional[str] = None
    source_type: str
    content: str

    class Config:
        orm_mode = True


class Note(BaseModel):
    title: str = Field(description="Note section title")
    content: str = Field(description="Main content of note")
    keywords: List[str] = Field(description="Key terms from note")
    importance_score: float = Field(ge=0, le=1, description="Importance score between 0-1")

class NotesOutput(BaseModel):
    notes: List[Note]
    summary: str
    total_score: float
    feedback: Optional[str] = None

