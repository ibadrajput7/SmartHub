# services.py

from typing import List
from fastapi import UploadFile
import openai
import os
from io import BytesIO
from moviepy import VideoFileClip
import youtube_dl
from dotenv import load_dotenv
from openai import OpenAI
from pathlib import Path

load_dotenv()

# Supported audio formats
SUPPORTED_FORMATS = ['mp3', 'mp4', 'mpeg', 'mpga', 'm4a', 'wav', 'webm']
MAX_FILE_SIZE = 25 * 1024 * 1024  # 25 MB in bytes

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


async def process_audio(audio_file: UploadFile) -> str:
    """Process audio file using OpenAI Whisper API"""
    try:
        # Validate file format
        file_ext = audio_file.filename.split('.')[-1].lower()
        if file_ext not in SUPPORTED_FORMATS:
            raise ValueError(
                f"Unsupported format. Supported: {', '.join(SUPPORTED_FORMATS)}"
            )

        # Read and validate file size
        file_contents = await audio_file.read()
        if len(file_contents) > MAX_FILE_SIZE:
            raise ValueError(f"File exceeds {MAX_FILE_SIZE/1024/1024}MB limit")

        # Create temp directory
        temp_dir = Path("temp_files")
        temp_dir.mkdir(exist_ok=True)

        # Generate unique temp file path
        temp_path = temp_dir / f"temp_audio_{os.urandom(8).hex()}.{file_ext}"
        try:
            # Write file
            with open(temp_path, "wb") as f:
                f.write(file_contents)

            # Transcribe with Whisper
            with open(temp_path, "rb") as f:
                transcript = client.audio.transcriptions.create(
                    model="whisper-1",
                    file=f,
                    response_format="text"  # Direct text response
                )

            if not transcript:
                raise ValueError("Failed to transcribe audio")

            # Return transcript directly as it's already text
            return transcript

        finally:
            # Cleanup
            if temp_path.exists():
                temp_path.unlink()
            try:
                if not any(temp_dir.iterdir()):
                    temp_dir.rmdir()
            except:
                pass

    except Exception as e:
        raise ValueError(f"Audio processing failed: {str(e)}")

    
    
# Function to structure notes with GPT
async def structure_notes_with_gpt(transcribed_text):
    try:
        # Create the prompt to pass to GPT
        prompt = f"Structure the following text into organized notes:\n\n{transcribed_text}"

        # Use OpenAI's GPT-3.5-Turbo model to generate structured notes
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an assistant that structures transcribed text into well-organized notes."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )

        # Extract the structured notes from the response
        structured_notes = response['choices'][0]['message']['content'].strip()
        return structured_notes

    except Exception as e:
        raise ValueError(f"Error in structuring notes with GPT: {str(e)}")

# Process video (extract audio and convert to notes)
async def process_video(video_file: UploadFile):
    try:
        # Save the uploaded video file temporarily
        video_contents = await video_file.read()
        video_file_path = "temp_video.mp4"
        with open(video_file_path, "wb") as f:
            f.write(video_contents)

        # Load the video using moviepy
        video = VideoFileClip(video_file_path)

        # Extract audio from the video
        audio_file_path = "temp_audio.mp3"
        video.audio.write_audiofile(audio_file_path)

        # Read the extracted audio file
        with open(audio_file_path, 'rb') as audio_file:
            audio_data = audio_file.read()

        # Use OpenAI's Whisper API to transcribe the audio
        transcript = openai.Audio.transcribe(
            "whisper-1",
            BytesIO(audio_data)
        )

        # Extract the transcription text
        transcription_text = transcript['text']

        # Structure the transcription into notes using GPT
        structured_notes = await structure_notes_with_gpt(transcription_text)

        # Clean up temporary files
        video.close()
        os.remove(video_file_path)
        os.remove(audio_file_path)

        return structured_notes

    except Exception as e:
        raise ValueError(f"Video processing failed: {str(e)}")

from typing import List, Union
from fastapi import UploadFile
import os
from io import BytesIO
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
from urllib.parse import urlparse, parse_qs
from pydantic import HttpUrl

async def process_youtube_link(youtube_url: Union[str, HttpUrl]) -> str:
    """Process YouTube video and extract transcript"""
    try:
        # Convert HttpUrl to string if needed
        url_str = str(youtube_url)

        # Extract video ID from URL
        video_id = None
        if "youtube.com" in url_str:
            parsed_url = urlparse(url_str)
            video_id = parse_qs(parsed_url.query).get('v', [None])[0]
        elif "youtu.be" in url_str:
            video_id = url_str.split('/')[-1].split('?')[0]

        if not video_id:
            raise ValueError("Could not extract video ID from URL")

        try:
            # Get available transcripts
            transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
            
            # Try English first, then any available language
            try:
                transcript = transcript_list.find_transcript(['en'])
            except:
                # Get first available transcript
                available_transcript = next(iter(transcript_list))
                transcript = (
                    available_transcript 
                    if available_transcript.language_code == 'en' 
                    else available_transcript.translate('en')
                )

            # Get transcript data
            transcript_data = transcript.fetch()
            
            # Join transcript texts with proper spacing
            full_transcript = ' '.join(
                entry['text'].strip() 
                for entry in transcript_data 
                if entry.get('text')
            )

            if not full_transcript:
                raise ValueError("No transcript text found")

            return full_transcript

        except TranscriptsDisabled:
            raise ValueError("Transcripts are disabled for this video")
        except Exception as e:
            raise ValueError(f"Failed to fetch transcript: {str(e)}")

    except Exception as e:
        raise ValueError(f"YouTube processing failed: {str(e)}")

    finally:
        # Clean up any temporary files
        temp_files = [f for f in os.listdir('.') if f.startswith('temp_')]
        for f in temp_files:
            try:
                os.remove(f)
            except:
                pass

# Process text input (structure or summarize text)
async def process_text(input_text: str):
    try:
        # Use GPT to structure or summarize the text
        structured_notes = await structure_notes_with_gpt(input_text)
        return structured_notes

    except Exception as e:
        raise ValueError(f"Text processing failed: {str(e)}")

# Process live audio and convert to notes
async def process_live_audio(live_audio_file: UploadFile):
    try:
        # Use the same processing as for uploaded audio files
        structured_notes = await process_audio(live_audio_file)
        return structured_notes

    except Exception as e:
        raise ValueError(f"Live audio processing failed: {str(e)}")