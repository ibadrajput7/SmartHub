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

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")



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
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    app.include_router(note_router, prefix="/api")

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