from fastapi import FastAPI, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import SessionLocal, Base, engine
from app.models import User, Note, Quiz
from app.notes import router as note_router
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from datetime import timedelta
from app.auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, Token, get_current_user, hash_password, verify_password
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated, Optional
from app.models import Note as DBNote, Quiz as DBQuiz
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SignupRequest(BaseModel):
    username: Optional[str] = None
    email: str
    password: str = Field(..., min_length=6, max_length=8) 

    @validator("password")
    def validate_password(cls, value):
        if len(value) > 8:
            raise ValueError("Password cannot be more than 8 characters.")
        return value

    @validator("email")
    def validate_email(cls, value):
        if len(value) > 15:
            raise ValueError("Email must not exceed 15 characters.")
        if not value.endswith(".com"):
            raise ValueError("Email must end with '.com'.")
        return value    

class LoginRequest(BaseModel):
    email: str
    password: str= Field(..., min_length=6, max_length=8)  

    @validator("password")
    def validate_password(cls, value):
        if len(value) > 8:
            raise ValueError("Password cannot be more than 8 characters.")
        return value

app = FastAPI(title="SmartHub")
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
async def startup():
    try:
        logger.info("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
        app.include_router(note_router, prefix="/api")
        logger.info("Note router included")
    except Exception as e:
        logger.error(f"Startup failed: {str(e)}")
        raise

@app.get("/health")
def health():
    """Health check."""
    return {"status": "ok"}

from fastapi.logger import logger

@app.post("/login", response_model=Token)
async def login_for_access_token(
    request: Request,
    db: Session = Depends(get_db)
):
    
    try:
        login_data = await request.json()
        email = login_data.get('email')
        password = login_data.get('password')
    except:
        
        form = await request.form()
        email = form.get('username')  
        password = form.get('password')
    
    if not email or not password:
        raise HTTPException(
            status_code=400,
            detail="Email and password are required"
        )
    
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password"
        )
        
    if len(user.hashed_password) < 6:
        raise HTTPException(
            status_code=400, 
            detail="Password is too short, please reset it"
            
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=user.username
    )

@app.post("/signup")
async def signup(request: SignupRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")

    username = request.username if request.username else request.email

    new_user = User(
        username=username,
        email=request.email,
        hashed_password=hash_password(request.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user": new_user.username
    }

@app.get("/protected")
async def protected_route(current_user: Annotated[User, Depends(get_current_user)]):
    return {"message": "This is a protected route", "user": current_user.username}



@app.get("/me")
def read_user_me(current_user: Annotated[User, Depends(get_current_user)]):
    """
    Get current user.
    """
    return {"message": "This is a protected route", "user": current_user.username}


# Add imports at top
from app.youtube.models import VideoAnalysisRequest, VideoAnalysisResponse
from app.youtube.utils import get_video_id, get_transcript, calculate_relevance_score
from app.models import Activity, ActivityType
# Add new endpoint
@app.post("/analyze-video", response_model=VideoAnalysisResponse)
async def analyze_video(
    request: VideoAnalysisRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Session = Depends(get_db) 
):
    try:
        video_id = get_video_id(str(request.url))
        transcript = get_transcript(video_id)
        results = calculate_relevance_score(request.topic, transcript)
    #   here we write code of saving this is database:
     # Log YouTube analysis activity
        activity = Activity(
            user_id=current_user.id,
            activity_type=ActivityType.YOUTUBE_ANALYSIS,
            source_type="youtube",
            details={
                "video_id": video_id,
                "topic": request.topic,
                "score": results.get("relevance_score")
            }
        )
        db.add(activity)
        db.commit()
        
        return VideoAnalysisResponse(**results)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# HEAR YOUR NOTES ENDPOINT AND FUNCTIONALITY HERE:
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse, Response
from fastapi.middleware.cors import CORSMiddleware
import requests
import PyPDF2
from io import BytesIO
# Configure API
ELEVENLABS_API_KEY = "sk_1d78e29a91d34c0740cf1b7f5719bfe5397628fa1463d0de"
ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech/nPczCjzI2devNBz1zQrb"  # Rachel voice ID
MAX_TEXT_LENGTH = 4000  # ElevenLabs limit
# Update file_to_audio endpoint to require authentication


@app.post("/file-to-audio")
async def file_to_audio(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)  
):
    try:
        content = await file.read()
        
        # Extract text based on file type
        if file.filename.lower().endswith('.pdf'):
            pdf = PyPDF2.PdfReader(BytesIO(content))
            extracted_text = ' '.join(page.extract_text() for page in pdf.pages)
        elif file.filename.lower().endswith('.txt'):
            extracted_text = content.decode('utf-8')
        else:
            raise HTTPException(status_code=400, detail="Only PDF and TXT files are supported")

        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="No text content found in file")

        # Truncate text if too long
        if len(extracted_text) > MAX_TEXT_LENGTH:
            extracted_text = extracted_text[:MAX_TEXT_LENGTH]

        # Call ElevenLabs API
        response = requests.post(
            ELEVENLABS_API_URL,
            headers={
                "xi-api-key": ELEVENLABS_API_KEY,
                "Content-Type": "application/json",
                "Accept": "audio/mpeg"
            },
            json={
                "text": extracted_text,
                "model_id": "eleven_monolingual_v1",
                "voice_settings": {
                    "stability": 0.5,
                    "similarity_boost": 0.5
                }
            }
        )

        if response.status_code != 200:
            print(f"ElevenLabs API error: {response.text}")
            raise HTTPException(status_code=500, detail="Failed to generate audio")

            # Log audio generation activity
        activity = Activity(
            user_id=current_user.id,
            activity_type=ActivityType.AUDIO_GENERATION,
            source_type=file.filename.split('.')[-1],  # file extension as source type
            details={
                "filename": file.filename,
                "file_type": file.content_type,
                "text_length": len(extracted_text),
                "audio_size": len(response.content)
            }
        )
        db.add(activity)
        db.commit()

        return Response(
            content=response.content,
            media_type="audio/mpeg",
            headers={
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
                "Content-Type": "audio/mpeg",
                "Content-Length": str(len(response.content))
            }
        )

    except Exception as e:
        print(f"Error in file_to_audio: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))






# Chatbot
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import AsyncOpenAI
import os
from typing import List, Dict
from pydantic import BaseModel

# Fix CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI
client = AsyncOpenAI(api_key=os.getenv('OPENAI_API_KEY'))

class ChatMessage(BaseModel):
    messages: List[Dict[str, str]]

SMART_HUB_CONTEXT = """You are SmartHub's AI assistant. SmartHub is an AI-powered learning platform that:
1. Generates structured notes from various content sources
2. Creates summaries of content
3. Generates quizzes for better learning
4. Supports multiple input types (text, PDF, YouTube)
5. Helps users organize and access their learning materials efficiently"""

@app.post("/api/chat")
async def chat(chat_message: ChatMessage):
    try:
        formatted_messages = [
            {"role": "system", "content": SMART_HUB_CONTEXT}
        ] + [{"role": msg["role"], "content": msg["content"]} for msg in chat_message.messages]

        completion = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=formatted_messages,
            temperature=0.7,
            max_tokens=500
        )

        return {"response": completion.choices[0].message.content}
    except Exception as e:
        print(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


        
# for admin:
from typing import List
from fastapi import Depends, HTTPException, Security
from jose import JWTError, jwt
from app.models import Admin
# Admin Pydantic models



class AdminCreate(BaseModel):
    user_id: int
    password: str

class AdminLogin(BaseModel):
    user_id: int
    password: str

class UserUpdate(BaseModel):
    username: str
    email: str

# Admin middleware
async def get_current_admin(
    token: str = Security(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Invalid admin credentials"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    admin = db.query(Admin).filter(Admin.user_id == int(user_id)).first()
    if not admin:
        raise credentials_exception
    return admin

# Admin endpoints
ADMIN_SECRET_KEY = "123123"  # Store in env variables

@app.post("/admin/register")
async def register_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    if db.query(Admin).filter(Admin.user_id == admin.user_id).first():
        raise HTTPException(status_code=400, detail="Admin ID already registered")

    new_admin = Admin(
        user_id=admin.user_id,
        hashed_password=hash_password(admin.password)
    )
    db.add(new_admin)
    db.commit()
    
    return {"message": "Admin registered successfully"}

@app.post("/admin/login")
async def login_admin(admin: AdminLogin, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.user_id == admin.user_id).first()
    if not db_admin or not verify_password(admin.password, db_admin.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": str(db_admin.user_id)})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/admin/activities")
async def get_all_activities(
    db: Session = Depends(get_db)
):
    activities = db.query(Activity).all()
    return {
        "total": len(activities),
        "activities": [
            {
                "id": a.id,
                "user_id": a.user_id,
                "activity_type": a.activity_type,
                "source_type": a.source_type,
                "details": a.details,
                "created_at": a.created_at,
                "status": "completed"  # Assuming status is always "completed" for simplicity
            } for a in activities
        ]
    }

@app.get("/admin/users")
async def get_all_users(
    db: Session = Depends(get_db)
):
    users = db.query(User).all()
    return {
        "total": len(users),
        "users": [
            {
                "id": u.id,
                "username": u.username,
                "email": u.email
            } for u in users
        ]
    }

@app.delete("/admin/users/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

@app.put("/admin/users/{user_id}")
async def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user_update.username:
        user.username = user_update.username
    if user_update.email:
        user.email = user_update.email
    
    db.commit()
    return {"message": "User updated successfully"}





