from pydantic import BaseModel, HttpUrl
from typing import List

class VideoAnalysisRequest(BaseModel):
    url: HttpUrl
    topic: str

class VideoAnalysisResponse(BaseModel):
    score: float 
    confidence: str
    topic_keywords: List[str]
    topic_coverage: float