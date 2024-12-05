# notes.py
from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Union, Optional, Literal
from pydantic import HttpUrl
from app.database import get_db
from app.models import Note as DBNote, Quiz as DBQuiz
from app.input_handler import InputProcessor, SourceType
import json
from fastapi.responses import FileResponse
from pathlib import Path
from app.models import User
from typing import Annotated
from app.auth import get_current_user


router = APIRouter()
processor = InputProcessor()

ProcessType = Literal["notes", "summary", "quiz", "audio"]

@router.post("/{source_type}/{process_type}")
async def process_content(
    current_user: Annotated[User, Depends(get_current_user)],
    source_type: SourceType,
    process_type: ProcessType,
    content: Union[UploadFile, str] = File(None),
    youtube_url: Optional[HttpUrl] = None,
    db: Session = Depends(get_db),
):
    """
    Unified endpoint for processing different types of content
    """
    try:
        # Input validation
        if source_type == SourceType.YOUTUBE and not youtube_url:
            raise HTTPException(status_code=400, detail="YouTube URL required")
        elif source_type != SourceType.YOUTUBE and not content:
            raise HTTPException(status_code=400, detail="Content required")

        # Process input
        input_content = youtube_url if source_type == SourceType.YOUTUBE else content
        result = await processor.process_input(
            source_type=source_type,
            content=input_content,
            process_type=process_type
        )

        # Database operations based on process type
        if process_type == "notes":
            # Convert notes list to string for storage
            notes_content = json.dumps(result.get("notes", []))
            note = DBNote(
                title=f"Notes from {source_type.value}",
                content=notes_content,  # Store as JSON string
                user_id=current_user.id
            )
            db.add(note)
            db.commit()
            db.refresh(note)
            result["note_id"] = note.id

        elif process_type == "summary":
            note = DBNote(
                title=f"Summary from {source_type.value}",
                content=result.get("summary", ""),  # Already a string
                user_id=current_user.id
            )
            db.add(note)
            db.commit()
            db.refresh(note)
            result["note_id"] = note.id

        elif process_type == "quiz":
            for question in result.get("questions", []):
                quiz = DBQuiz(
                    title=f"Quiz from {source_type.value}",
                    question=question["question"],
                    answer=question["answer"],
                    user_id=current_user.id
                )
                db.add(quiz)
            db.commit()
            result["quiz_saved"] = True

        return {
            "message": f"{process_type.title()} generated successfully",
            "source_type": source_type,
            "process_type": process_type,
            "result": result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Additional endpoints for specific operations
@router.get("/user/notes")
async def get_user_notes(current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    """Get all notes for a user"""
    notes = db.query(DBNote).filter(DBNote.user_id == current_user.id).all()
    return notes

@router.get("/user/quizzes")
async def get_user_quizzes(current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    """Get all quizzes for a user"""
    quizzes = db.query(DBQuiz).filter(DBQuiz.user_id == current_user.id).all()
    return quizzes

@router.delete("/notes/{note_id}")
async def delete_note(current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    """Delete a specific note"""
    note = db.query(DBNote).filter(DBNote.id == current_user.note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return {"message": "Note deleted successfully"}

# New get_note_by_id endpoint
@router.get("/notes/{note_id}")
async def get_note_by_id(note_id: int, current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    """Get a specific note by ID"""
    note = db.query(DBNote).filter(DBNote.id == note_id, DBNote.user_id == current_user.id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"result": note}

@router.get("/summaries/{summary_id}")
async def get_summary_by_id(
    summary_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    """Get a specific summary by ID"""
    summary = db.query(DBNote).filter(
        DBNote.id == summary_id,
        DBNote.user_id == current_user.id
    ).first()
    if not summary:
        raise HTTPException(status_code=404, detail="Summary not found")

    return {"result": summary}

# notes.py - Add new endpoint for audio streaming
@router.get("/audio/{filename}")
async def get_audio(filename: str):
    """Stream audio file"""
    file_path = Path("audio_files") / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Audio file not found")
        
    return FileResponse(
        file_path,
        media_type="audio/mpeg",
        filename=filename
    )