from typing import List, Optional
from fastapi import UploadFile
import openai
import os
from io import BytesIO
from moviepy import VideoFileClip
from youtube_dl import YoutubeDL
from dotenv import load_dotenv
from .services import structure_notes_with_gpt
from .schemas import Note, NotesOutput


load_dotenv()

# Speech to Text Function using OpenAI Whisper API
async def process_audio(audio_file: UploadFile):
    try:
        # Read the uploaded audio file
        file_contents = await audio_file.read()

        # Use OpenAI's Whisper API to transcribe the audio
        transcript = openai.Audio.transcribe(
            "whisper-1",
            BytesIO(file_contents)
        )

        # Extract the transcription text
        transcription_text = transcript['text']

        # Structure the transcript into notes using GPT
        structured_notes = await structure_notes_with_gpt(transcription_text)
        return structured_notes

    except Exception as e:
        raise ValueError(f"Audio processing failed: {str(e)}")

# Function to process video and transcribe audio
def process_video(file):
    temp_audio = "temp_audio.wav"
    video = VideoFileClip(file)
    video.audio.write_audiofile(temp_audio)

    content = process_audio(temp_audio)
    os.remove(temp_audio)
    return content

# Function to fetch YouTube transcription
def fetch_youtube_transcription(link):
    ydl_opts = {
        "format": "bestaudio/best",
        "postprocessors": [{
            "key": "FFmpegMetadata"
        }]
    }
    with YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(link, download=False)
        subtitles = info_dict.get("subtitles")
        if subtitles and "en" in subtitles:
            return subtitles["en"][0]["url"]
    return "No subtitles found for this video."


from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

from langchain_openai import ChatOpenAI

# Initialize LLM
llm = ChatOpenAI(model="gpt-4o", temperature=0)


# from .state import AgentState
from langchain_core.runnables import RunnableConfig

def generate_notes(transcript: str, config: Optional[RunnableConfig] = None) -> dict:
    """
    Generate structured notes from transcript content
    """
    try:
        # Initialize LLM and parser
        llm = ChatOpenAI(temperature=0.7)
        json_parser = JsonOutputParser()

        # Create prompt template with properly escaped JSON structure
        prompt = ChatPromptTemplate.from_template("""
        Analyze this transcript and create structured notes:
        
        Transcript: {transcript}

        Create detailed notes following this structure:
        1. Break into logical sections
        2. Extract key points and concepts
        3. Identify important keywords
        4. Assign importance scores

        Return analysis in this exact JSON format:
        {{
            "notes": [
                {{
                    "title": "Section Title",
                    "content": "Main points and key concepts",
                    "keywords": ["keyword1", "keyword2"],
                    "importance_score": 0.8
                }}
            ],
            "summary": "Brief overview of main points",
            "total_score": 0.85,
            "feedback": "Analysis feedback and recommendations"
        }}
        """)

        # Setup processing chain
        json_llm = llm.bind(response_format={"type": "json_object"})
        chain = prompt | json_llm | json_parser

        # Process transcript
        result = chain.invoke({"transcript": transcript}, config)

        # Convert to Pydantic model
        notes_output = NotesOutput(
            notes=[Note(**note) for note in result["notes"]],
            summary=result["summary"],
            total_score=result["total_score"],
            feedback=result.get("feedback", "")
        )

        return notes_output.model_dump()

    except Exception as e:
        error_msg = f"Failed to generate notes: {str(e)}"
        print(f"Error: {error_msg}")
        
        return {
            "notes": [],
            "summary": "",
            "total_score": 0.0,
            "feedback": error_msg,
            "error": True
        }
    
def generate_summarize(transcript: str, config: Optional[RunnableConfig] = None) -> dict:
    """
    Summarize given transcript content
    """
    try:
        # Initialize LLM and parser
        llm = ChatOpenAI(temperature=0.7)
        json_parser = JsonOutputParser()

        # Create prompt template with properly escaped JSON structure
        prompt = ChatPromptTemplate.from_template("""
        Analyze this transcript and create summary of it:
        
        Input: {transcript}

        Create a concise summary of the main points and key concepts.

        Return analysis in this exact JSON format:
        {{
            "summary": "Concise summary of main points"
        }}
        """)

        # Setup processing chain
        json_llm = llm.bind(response_format={"type": "json_object"})
        chain = prompt | json_llm | json_parser

        # Process transcript
        result = chain.invoke({"transcript": transcript}, config)

        # Convert to Pydantic model
        notes_output = NotesOutput(
            summary=result["summary"]
        )

        return notes_output.model_dump()

    except Exception as e:
        error_msg = f"Failed to generate notes: {str(e)}"
        print(f"Error: {error_msg}")
        
        return {
            "summary": "",
            "error": True
        }