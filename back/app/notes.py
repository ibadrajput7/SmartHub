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
    
    try:
      
        if source_type == SourceType.YOUTUBE and not youtube_url:
            raise HTTPException(status_code=400, detail="YouTube URL required")
        elif source_type != SourceType.YOUTUBE and not content:
            raise HTTPException(status_code=400, detail="Content required")

        
        input_content = youtube_url if source_type == SourceType.YOUTUBE else content
        result = await processor.process_input(
            source_type=source_type,
            content=input_content,
            process_type=process_type
        )

        
        if process_type == "notes":
            notes_content = json.dumps(result.get("notes", []))
            note = DBNote(
                title=f"Notes from {source_type.value}",
                content=notes_content,  
                user_id=current_user.id
            )
            db.add(note)
            db.commit()
            db.refresh(note)
            result["note_id"] = note.id

        elif process_type == "summary":
            note = DBNote(
                title=f"Summary from {source_type.value}",
                content=result.get("summary", ""),  
                user_id=current_user.id
            )
            db.add(note)
            db.commit()
            db.refresh(note)
            result["note_id"] = note.id

        elif process_type == "quiz":
            quiz = DBQuiz(
                title=f"Quiz from {source_type.value}",
                questions=result.get("questions", []),  
                user_id=current_user.id
            )
            db.add(quiz)
            db.commit()
            db.refresh(quiz)
            result["quiz_id"] = quiz.id
            result["quiz_saved"] = True

        return {
            "message": f"{process_type.title()} generated successfully",
            "source_type": source_type,
            "process_type": process_type,
            "result": result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/user/notes")
async def get_user_notes(current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    
    notes = db.query(DBNote).filter(DBNote.user_id == current_user.id).all()
    return notes

@router.get("/user/quizzes")
async def get_user_quizzes(current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    quizzes = db.query(DBQuiz).filter(DBQuiz.user_id == current_user.id).all()
    return quizzes

@router.delete("/notes/{note_id}")
async def delete_note(current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    note = db.query(DBNote).filter(DBNote.id == current_user.note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return {"message": "Note deleted successfully"}

@router.get("/notes/{note_id}")
async def get_note_by_id(note_id: int, current_user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
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
    summary = db.query(DBNote).filter(
        DBNote.id == summary_id,
        DBNote.user_id == current_user.id
    ).first()
    if not summary:
        raise HTTPException(status_code=404, detail="Summary not found")

    return {"result": summary}

@router.get("/quizzes/{quiz_id}")
async def get_quiz_by_id(
    quiz_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    """Get a specific quiz by ID"""
    quiz = db.query(DBQuiz).filter(
        DBQuiz.id == quiz_id,
        DBQuiz.user_id == current_user.id
    ).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    quiz_data = {
        "id": quiz.id,
        "title": quiz.title,
        "questions": quiz.questions,  
        "user_id": quiz.user_id
    }
    return {"result": quiz_data}


@router.get("/audio/{filename}")
async def get_audio(filename: str):
    file_path = Path("audio_files") / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Audio file not found")
        
    return FileResponse(
        file_path,
        media_type="audio/mpeg",
        filename=filename
    )