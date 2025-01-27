from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Replace with your MySQL credentials
DATABASE_URL = "mysql+mysqlconnector://finalyear:Ibadibad_123@localhost:3306/project"

engine = create_engine(DATABASE_URL)  # Remove SQLite-specific arguments
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()