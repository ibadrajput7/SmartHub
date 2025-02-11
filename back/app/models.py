from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON, DateTime, Enum as SQLAlchemyEnum
from app.database import Base
from sqlalchemy.orm import relationship
import enum
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255))
    
    # Add relationship to activities
    activities = relationship("Activity", back_populates="user", cascade="all, delete-orphan")


class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200), index=True)
    content = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    user = relationship("User")

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200))
    questions = Column(JSON)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    user = relationship("User")

# Add new enum for activity types
class ActivityType(str, enum.Enum):
    NOTE_GENERATION = "note_generation"
    QUIZ_GENERATION = "quiz_generation"
    SUMMARY_GENERATION = "summary_generation"
    AUDIO_GENERATION = "audio_generation"
    YOUTUBE_ANALYSIS = "youtube_analysis"

# Add new Activity model
class Activity(Base):
    __tablename__ = "activities"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    activity_type = Column(SQLAlchemyEnum(ActivityType))
    source_type = Column(String(50))  # text, audio, video, youtube, live
    details = Column(JSON, nullable=True)  # For storing additional activity details
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="activities")    
    
class Admin(Base):
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, unique=True, index=True)
    hashed_password = Column(String(255))