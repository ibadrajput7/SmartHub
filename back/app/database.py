from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./smarthub.db"  # SQLite database file

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Add this temporarily to recreate tables
def init_db():
    Base.metadata.drop_all(bind=engine)  # WARNING: This will delete all data
    Base.metadata.create_all(bind=engine)

# Run this once to recreate tables, then comment it out
# init_db()