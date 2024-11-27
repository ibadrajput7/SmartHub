# input_handler.py
from enum import Enum
from typing import Optional, Union, Literal
from fastapi import UploadFile
from pydantic import HttpUrl
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableConfig
from fastapi.responses import FileResponse
from pathlib import Path
import tempfile
import os
from datetime import datetime
import io
from typing import Any, Generator
from elevenlabs.client import ElevenLabs
from app.services import (
    process_audio, 
    process_video,
    process_youtube_link,
    process_live_audio
)

class SourceType(str, Enum):
    TEXT = "text"
    AUDIO = "audio"
    VIDEO = "video"
    YOUTUBE = "youtube"
    LIVE = "live"

ProcessType = Literal["notes", "summary", "quiz", "audio"]

class InputProcessor:
    def __init__(self):
        self.llm = ChatOpenAI(temperature=0.7)
        self.json_parser = JsonOutputParser()
        # Initialize ElevenLabs
        self.client = ElevenLabs(
            api_key="sk_ec209b32fd7ff532ed8b3faf1939a2339f9a81851f54234c", # Defaults to ELEVEN_API_KEY
        )
        # Create audio directory
        self.audio_dir = Path("audio_files")
        self.audio_dir.mkdir(exist_ok=True)

    async def process_input(
        self,
        source_type: SourceType,
        content: Union[UploadFile, str, HttpUrl],
        process_type: ProcessType,
        config: Optional[RunnableConfig] = None
    ) -> dict:
        try:
            # Convert input to text
            transcript = await self._get_transcript(source_type, content)
            
            # Process based on type
            if process_type == "notes":
                return await self._generate_notes(transcript, config)
            elif process_type == "summary":
                return await self._generate_summary(transcript, config)
            elif process_type == "quiz":
                return await self._generate_quiz(transcript, config)
            elif process_type == "audio":
                return await self._generate_audio(transcript, config)
            else:
                raise ValueError(f"Invalid process type: {process_type}")
            
        except Exception as e:
            raise ValueError(f"Processing failed: {str(e)}")

    async def _get_transcript(
        self, 
        source_type: SourceType,
        content: Union[UploadFile, str, HttpUrl]
    ) -> str:
        if source_type == SourceType.AUDIO:
            return await process_audio(content)
        elif source_type == SourceType.VIDEO:
            return await process_video(content)
        elif source_type == SourceType.YOUTUBE:
            return await process_youtube_link(content)
        elif source_type == SourceType.LIVE:
            return await process_live_audio(content)
        else:  # TEXT
            return content if isinstance(content, str) else (await content.read()).decode()

    async def _generate_notes(self, transcript: str, config: Optional[RunnableConfig] = None) -> dict:
        prompt = ChatPromptTemplate.from_template("""
        Analyze this transcript and create structured notes:
        Transcript: {transcript}
        Return in JSON format:
        {{
            "notes": [
                {{
                    "title": "Section Title",
                    "content": "Main points",
                    "keywords": ["keyword1", "keyword2"],
                    "importance_score": 0.8
                }}
            ],
            "total_score": 0.85,
            "feedback": "Analysis feedback"
        }}
        """)
        chain = prompt | self.llm.bind(response_format={"type": "json_object"}) | self.json_parser
        return await chain.ainvoke({"transcript": transcript}, config)

    async def _generate_summary(self, transcript: str, config: Optional[RunnableConfig] = None) -> dict:
        prompt = ChatPromptTemplate.from_template("""
        Create a concise summary:
        Text: {transcript}
        Return in JSON format:
        {{
            "summary": "Concise summary here"
        }}
        """)
        chain = prompt | self.llm.bind(response_format={"type": "json_object"}) | self.json_parser
        return await chain.ainvoke({"transcript": transcript}, config)

    async def _generate_quiz(self, transcript: str, config: Optional[RunnableConfig] = None) -> dict:
        prompt = ChatPromptTemplate.from_template("""
        Create quiz questions:
        Text: {transcript}
        Return in JSON format:
        {{
            "questions": [
                {{
                    "question": "Question text",
                    "options": ["A", "B", "C", "D"],
                    "answer": "Correct option"
                }}
            ]
        }}
        """)
        chain = prompt | self.llm.bind(response_format={"type": "json_object"}) | self.json_parser
        return await chain.ainvoke({"transcript": transcript}, config)

    async def _generate_audio(self, transcript: str, _: Optional[RunnableConfig] = None) -> dict:
        """Generate audio from text using ElevenLabs"""
        try:
            # Generate audio using ElevenLabs client
            audio_data = self.client.generate(
                text=transcript,
                voice="Brian",
                model="eleven_multilingual_v2",
                output_format="mp3_44100_128"
            )

            # Generate unique filename
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"audio_{timestamp}"

            # Save audio to file
            saved_path = await self._save_audio(
                audio_data=audio_data,
                filename=filename
            )

            # Return audio metadata
            return {
                "audio_url": f"/api/audio/{saved_path.name}",
                "filename": saved_path.name,
                "format": "mp3",
                "message": "Audio generated successfully"
            }

        except Exception as e:
            raise ValueError(f"Audio generation failed: {str(e)}")

    async def _save_audio(
        self,
        audio_data: Union[bytes, Generator[Any, None, None]],
        filename: str
    ) -> Path:
        """Save audio data to file system"""
        try:
            # Create file path
            saved_path = self.audio_dir / f"{filename}.mp3"
            
            # Write audio data
            with io.BytesIO() as buffer:
                if isinstance(audio_data, (bytes, bytearray)):
                    buffer.write(audio_data)
                else:
                    for chunk in audio_data:
                        if isinstance(chunk, (bytes, bytearray)):
                            buffer.write(chunk)
                        else:
                            raise TypeError("Generator must yield bytes")
                            
                # Save to file
                with open(saved_path, 'wb') as f:
                    f.write(buffer.getvalue())
                
            return saved_path
            
        except Exception as e:
            raise ValueError(f"Failed to save audio: {str(e)}")