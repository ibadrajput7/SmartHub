from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal, Base, engine
from app.models import User, Note, Quiz
from app.auth import hash_password, verify_password
# from app.routers import router as note_router
from app.notes import router as note_router
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from datetime import timedelta
# from app.auth import (
#     # create_access_token, 
#     ACCESS_TOKEN_EXPIRE_MINUTES,
#     oauth2_scheme,
#     SECRET_KEY,
#     ALGORITHM
# )
# Define a Pydantic model for the input

class SignupRequest(BaseModel):
    username: str
    email: str
    password: str

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  # React frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Dependency for getting the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



# Create database tables and include router
@app.on_event("startup")
def startup():
    # Create all tables in the database
    Base.metadata.create_all(bind=engine)
    
    # Include the note router
    app.include_router(note_router, prefix="/api")

@app.get("/health")
def health():
    """Health check."""
    return {"status": "ok"}

from fastapi.logger import logger

@app.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    try:
        # Log incoming request data
        logger.info(f"Signup attempt for email: {request.email}")

        # Check if user already exists
        user = db.query(User).filter(User.email == request.email).first()
        if user:
            logger.info("User already exists.")
            return {"message": "User already exists", "status": 400}

        # Create new user
        new_user = User(
            username=request.username,
            email=request.email,
            hashed_password=hash_password(request.password),
        )
        logger.info(f"Creating new user: {new_user.username}")

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        logger.info(f"User {new_user.username} created successfully.")
        return {"message": "User created successfully", "user": new_user.username}
    except Exception as e:
        logger.error(f"Signup failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Server error")

# Login endpoint
from pydantic import BaseModel

# Define the LoginRequest model
class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return {"message": "Login successful", "user": user.username}
