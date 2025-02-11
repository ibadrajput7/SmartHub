import mysql.connector
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

try:
    logger.info("Attempting to connect to MySQL...")
    conn = mysql.connector.connect(
        host="localhost",
        user="finalyear",
        password="Ibadibad_123",
        database="project"
    )
    logger.info("Connection successful!")
    
    cursor = conn.cursor()
    cursor.execute("SELECT 1")
    result = cursor.fetchone()
    logger.info(f"Test query result: {result}")
    
except mysql.connector.Error as err:
    logger.error(f"MySQL Error: {err}", exc_info=True)
finally:
    if 'conn' in locals() and conn.is_connected():
        conn.close()
        logger.info("MySQL connection closed.")