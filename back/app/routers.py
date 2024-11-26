from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Note
from app.models import User
from app.services import process_audio, process_video, process_text, process_youtube_link  # Custom services for each source
from fastapi import UploadFile, File
from app.services import process_live_audio 
from concurrent.futures import ThreadPoolExecutor
import asyncio
from gtts import gTTS
import os
from io import BytesIO

router = APIRouter()

# Create a new note
@router.post("/notes/")
def create_note(title: str, content: str, user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    note = Note(title=title, content=content, user_id=user_id)
    db.add(note)
    db.commit()
    db.refresh(note)
    return {"message": "Note created successfully", "note": note}

# Get all notes for a user
@router.get("/notes/{user_id}")
def get_notes(user_id: int, db: Session = Depends(get_db)):
    notes = db.query(Note).filter(Note.user_id == user_id).all()
    if not notes:
        raise HTTPException(status_code=404, detail="No notes found")
    return notes

# Update a note
@router.put("/notes/{note_id}")
def update_note(note_id: int, title: str, content: str, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    note.title = title
    note.content = content
    db.commit()
    db.refresh(note)
    return {"message": "Note updated successfully", "note": note}

# Delete a note
@router.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()
    return {"message": "Note deleted successfully"}


# Endpoint for audio source
@router.post("/api/notes/audio/")
async def generate_notes_from_audio(user_id: int, audio_file: UploadFile, db: Session = Depends(get_db)):
    try:
        # Process the audio file and generate notes
        notes = await process_audio(audio_file)

        # Save the generated notes to the database
        new_note = Note(title="Generated Audio Note", user_id=user_id, content=notes)
        db.add(new_note)
        db.commit()

        return {"message": "Notes generated successfully", "notes": notes}

    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

        
# Endpoint for video source
@router.post("/notes/video/")
async def generate_notes_from_video(user_id: int, video_file: UploadFile, db: Session = Depends(get_db)):
    try:
        # Process video to generate text notes
        notes_content = await process_video(video_file)

        # Create a new note in the database
        note = Note(title="Generated Video Note", content=notes_content, user_id=user_id)
        db.add(note)
        db.commit()
        db.refresh(note)

        return {"message": "Note generated successfully", "note": note}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error generating note: {str(e)}")

# Endpoint for topic input
@router.post("/notes/topic/")
async def generate_notes_from_topic(user_id: int, topic_name: str, db: Session = Depends(get_db)):
    try:
        # For now, just returning a placeholder note content based on topic_name
        notes_content = f"These are notes generated for the topic: {topic_name}. Add logic here to process the topic."

        # Create a new note in the database
        note = Note(title=f"Generated Notes on {topic_name}", content=notes_content, user_id=user_id)
        db.add(note)
        db.commit()
        db.refresh(note)

        return {"message": "Note generated successfully", "note": note}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error generating note: {str(e)}")

# Endpoint for YouTube link
@router.post("/notes/youtube/")
async def generate_notes_from_youtube(user_id: int, youtube_link: str, db: Session = Depends(get_db)):
    try:
        # Extract content from YouTube video
        notes_content = await process_youtube_link(youtube_link)

        # Create a new note in the database
        note = Note(title="Generated YouTube Note", content=notes_content, user_id=user_id)
        db.add(note)
        db.commit()
        db.refresh(note)

        return {"message": "Note generated successfully", "note": note}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error generating note: {str(e)}")


    # live recording to Notes
   # Initialize the ThreadPoolExecutor
executor = ThreadPoolExecutor()

@router.post("/notes/live/")
async def generate_notes_from_live_audio(user_id: int, live_audio_file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Run process_live_audio in a background thread to avoid blocking async execution
        loop = asyncio.get_event_loop()
        notes_content = await loop.run_in_executor(executor, process_live_audio, live_audio_file)

        # Create a new note in the database
        note = Note(title="Generated Live Audio Note", content=notes_content, user_id=user_id)
        db.add(note)
        db.commit()
        db.refresh(note)

        return {"message": "Note generated successfully", "note": note}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error generating note: {str(e)}")


        # Endpoint for providing a file
# Endpoint for hearing notes from an uploaded file

from fastapi.responses import JSONResponse


@router.post("/api/notes/hear-file/")
async def hear_file(file: UploadFile = File(...)):
    try:
        # Read the file as binary data
        file_content = await file.read()

        try:
            # Decode the content to text (assuming it's text data)
            text = file_content.decode('utf-8')
        except UnicodeDecodeError:
            # Handle cases where the file is not valid UTF-8
            return JSONResponse(content={"error": "File is not in valid UTF-8 format"}, status_code=400)

        # Convert the text into speech using gTTS
        tts = gTTS(text)
        audio_file_path = "generated_audio.mp3"
        tts.save(audio_file_path)  # Save the generated speech as an audio file

        # Read the generated audio file to return it as a response
        with open(audio_file_path, "rb") as audio_file:
            audio_content = audio_file.read()

        # Clean up by removing the generated audio file
        os.remove(audio_file_path)

        return {"message": "Audio generated successfully", "audio": audio_content}

    except Exception as e:
        # Catch any other exceptions and return a 500 error
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



# Endpoint for hearing notes from direct text input
@router.post("/api/notes/hear-text/")
async def hear_notes_from_text(text: str):
    try:
        # Step 1: Convert the provided text to speech using gTTS
        tts = gTTS(text)
        audio_file_path = "generated_audio.mp3"
        tts.save(audio_file_path)  # Save the speech audio file

        # Step 2: Read the audio file to return it as a response
        with open(audio_file_path, "rb") as audio_file:
            audio_content = audio_file.read()

        # Step 3: Clean up by removing the generated audio file after serving it
        os.remove(audio_file_path)

        return {"message": "Audio generated successfully", "audio": audio_content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
