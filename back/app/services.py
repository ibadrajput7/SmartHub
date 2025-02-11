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

SUPPORTED_FORMATS = ['mp3', 'mp4', 'mpeg', 'mpga', 'm4a', 'wav', 'webm']
MAX_FILE_SIZE = 25 * 1024 * 1024  

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


async def process_audio(audio_file: UploadFile) -> str:
    try:
        
        file_ext = audio_file.filename.split('.')[-1].lower()
        if file_ext not in SUPPORTED_FORMATS:
            raise ValueError(
                f"Unsupported format. Supported: {', '.join(SUPPORTED_FORMATS)}"
            )

        file_contents = await audio_file.read()
        if len(file_contents) > MAX_FILE_SIZE:
            raise ValueError(f"File exceeds {MAX_FILE_SIZE/1024/1024}MB limit")

        temp_dir = Path("temp_files")
        temp_dir.mkdir(exist_ok=True)

        temp_path = temp_dir / f"temp_audio_{os.urandom(8).hex()}.{file_ext}"
        try:
            
            with open(temp_path, "wb") as f:
                f.write(file_contents)

            with open(temp_path, "rb") as f:
                transcript = client.audio.transcriptions.create(
                    model="whisper-1",
                    file=f,
                    response_format="text"  
                )

            if not transcript:
                raise ValueError("Failed to transcribe audio")

            
            return transcript

        finally:
            
            if temp_path.exists():
                temp_path.unlink()
            try:
                if not any(temp_dir.iterdir()):
                    temp_dir.rmdir()
            except:
                pass

    except Exception as e:
        raise ValueError(f"Audio processing failed: {str(e)}")

    
    
async def structure_notes_with_gpt(transcribed_text):
    try:
        
        prompt = f"Structure the following text into organized notes:\n\n{transcribed_text}"

        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an assistant that structures transcribed text into well-organized notes."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )

        structured_notes = response['choices'][0]['message']['content'].strip()
        return structured_notes

    except Exception as e:
        raise ValueError(f"Error in structuring notes with GPT: {str(e)}")


async def process_video(video_file: UploadFile):
    try:
        
        video_contents = await video_file.read()
        video_file_path = "temp_video.mp4"
        with open(video_file_path, "wb") as f:
            f.write(video_contents)

        video = VideoFileClip(video_file_path)

        audio_file_path = "temp_audio.mp3"
        video.audio.write_audiofile(audio_file_path)

        with open(audio_file_path, 'rb') as audio_file:
            audio_data = audio_file.read()

        transcript = openai.Audio.transcribe(
            "whisper-1",
            BytesIO(audio_data)
        )

        transcription_text = transcript['text']

       
        structured_notes = await structure_notes_with_gpt(transcription_text)

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
    
    try:
      
        url_str = str(youtube_url)

        video_id = None
        if "youtube.com" in url_str:
            parsed_url = urlparse(url_str)
            video_id = parse_qs(parsed_url.query).get('v', [None])[0]
        elif "youtu.be" in url_str:
            video_id = url_str.split('/')[-1].split('?')[0]

        if not video_id:
            raise ValueError("Could not extract video ID from URL")

        try:
           
            transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
            
            
            try:
                transcript = transcript_list.find_transcript(['en'])
            except:
               
                available_transcript = next(iter(transcript_list))
                transcript = (
                    available_transcript 
                    if available_transcript.language_code == 'en' 
                    else available_transcript.translate('en')
                )

            
            transcript_data = transcript.fetch()
            
            
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
        
        temp_files = [f for f in os.listdir('.') if f.startswith('temp_')]
        for f in temp_files:
            try:
                os.remove(f)
            except:
                pass


async def process_text(input_text: str):
    try:
        
        structured_notes = await structure_notes_with_gpt(input_text)
        return structured_notes

    except Exception as e:
        raise ValueError(f"Text processing failed: {str(e)}")


async def process_live_audio(live_audio_file: UploadFile):
    try:
        
        structured_notes = await process_audio(live_audio_file)
        return structured_notes

    except Exception as e:
        raise ValueError(f"Live audio processing failed: {str(e)}")