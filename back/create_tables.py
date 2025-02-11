import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import engine
from app.models import Base

def main():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created")

if __name__ == "__main__":
    main()