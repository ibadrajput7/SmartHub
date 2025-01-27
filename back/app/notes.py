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


@router.get("/user/notes", response_model=list[dict])
async def get_user_notes(
    current_user: Annotated[User, Depends(get_current_user)], 
    db: Session = Depends(get_db)
):
    try:
        notes = db.query(DBNote).filter(
            DBNote.user_id == current_user.id
        ).order_by(DBNote.created_at.desc()).all()
        
        if not notes:
            return []
            
        return [
            {
                "id": note.id,
                "title": note.title,
                "content": note.content,
                "created_at": note.created_at.isoformat(),
                "user_id": note.user_id
            }
            for note in notes
        ]
    except Exception as e:
        print(f"Error fetching notes: {str(e)}")  # Debug log
        raise HTTPException(status_code=500, detail=str(e))




        
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
    
@router.get("/notes/summary/{note_id}")
async def get_note_summary(
    note_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db)
):
    # Get note and verify access
    note = db.query(DBNote).filter(
        DBNote.id == note_id,
        DBNote.user_id == current_user.id
    ).first()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    try:
        # Parse notes content
        notes_content = json.loads(note.content)
        
        # Get most important notes (importance_score >= 0.8)
        important_notes = [n for n in notes_content if n['importance_score'] >= 0.8]
        
        # Extract main topics
        topics = [n['title'] for n in notes_content]
        
        # Collect unique keywords from important notes
        keywords = list(set([
            keyword 
            for note in important_notes 
            for keyword in note['keywords']
        ]))[:5]  # Limit to top 5 keywords
        
        # Generate concise summary
        summary = (
            f"This document covers {', '.join(topics)}. "
            f"Key concepts include: {', '.join(keywords)}. "
            f"Main points: {'. '.join(n['content'] for n in important_notes[:2])}."
        )
        
        return {
            "result": {
                "content": summary,
                "title": note.title
            }
        }
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid note content format")
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Invalid note structure: {str(e)}")




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