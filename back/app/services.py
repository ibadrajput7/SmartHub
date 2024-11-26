from pydantic import BaseModel
from typing import List
import speech_recognition as sr
import moviepy.editor as mp
import youtube_dl
from fastapi import UploadFile
import openai
from pydub import AudioSegment
from io import BytesIO

openai.api_key = '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'

# process audio
# Speech to Text Function
async def process_audio(audio_file):
    try:
        # Temporary file path for saving audio
        audio_file_path = "temp_audio.wav"

        # Read the uploaded file
        file_contents = await audio_file.read()

        # Convert the uploaded file to WAV format using pydub
        audio = AudioSegment.from_file(BytesIO(file_contents))
        audio = audio.set_channels(1).set_frame_rate(16000)  # Mono and 16kHz for compatibility
        audio.export(audio_file_path, format="wav")

        # Initialize the recognizer
        recognizer = sr.Recognizer()

        # Transcribe the audio using SpeechRecognition
        with sr.AudioFile(audio_file_path) as source:
            audio_data = recognizer.record(source)
            transcript = recognizer.recognize_google(audio_data)

        # Clean up temporary files
        os.remove(audio_file_path)

        # Structure the transcript into notes using GPT
        structured_notes = await structure_notes_with_gpt(transcript)
        return structured_notes

    except Exception as e:
        raise ValueError(f"Audio processing failed: {str(e)}")


# Use GPT to structure notes
# Define the function to structure notes with GPT
async def structure_notes_with_gpt(transcribed_text):
    try:
        # Create the prompt to pass to GPT for structuring
        prompt = f"Structure the following text into organized notes:\n\n{transcribed_text}"

        # Use the new OpenAI completions method (available in OpenAI Python >= 1.0.0)
        response = openai.completions.create(
            model="gpt-3.5-turbo",  # Or use "gpt-4" if you have access to GPT-4
            prompt=prompt,
            max_tokens=500,  # Adjust token count as needed
            temperature=0.7  # Adjust temperature for creativity level
        )

        # Extract the structured notes from the response
        structured_notes = response['choices'][0]['text'].strip()  # Get the text response

        return structured_notes

    except Exception as e:
        raise ValueError(f"Error in structuring notes with GPT: {str(e)}")

import os

# Process video (extract audio and convert to notes)
async def process_audio_for_video(audio_file_path):
    try:
        # Process the audio extracted from video (reuse the same audio processing logic)
        # Placeholder for actual audio-to-text processing logic
        processed_notes = "Notes extracted successfully from video audio."
        return processed_notes
    except Exception as e:
        raise ValueError(f"Audio processing failed: {str(e)}")

# Process video (extract audio and convert to notes)
async def process_video(video_file):
    try:
        # Temporary path to save the extracted audio and video
        audio_file_path = "temp_audio.wav"
        video_file_path = "temp_video.mp4"

        # Save the uploaded video file temporarily
        with open(video_file_path, "wb") as f:
            f.write(await video_file.read())

        # Load the video using moviepy
        video = mp.VideoFileClip(video_file_path)

        # Extract audio from the video
        audio = video.audio
        audio.write_audiofile(audio_file_path)

        # Ensure video file is closed after extracting audio
        video.close()

        # Open the audio file in binary mode and process it with process_audio_for_video
        with open(audio_file_path, "rb") as audio_file:
            # Use process_audio_for_video for video processing (not process_audio)
            notes_content = await process_audio_for_video(audio_file)  # Pass the actual file object

        # Clean up the temporary files
        os.remove(video_file_path)
        os.remove(audio_file_path)

        return notes_content

    except Exception as e:
        raise ValueError(f"Video processing failed: {str(e)}")

# Process YouTube link (simplified version)
import youtube_dl

# Process YouTube link (extract video description as notes)
async def process_youtube_link(youtube_url: str) -> str:
    try:
        ydl_opts = {
            'quiet': True, 
            'extractaudio': True,
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        }

        # Extract video info using youtube_dl
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(youtube_url, download=False)
            # Get video description or transcript
            notes_content = info_dict.get('description', 'No description available.')

        return notes_content

    except Exception as e:
        raise ValueError(f"YouTube processing failed: {str(e)}")


async def process_text(input_text: str) -> str:
    # Add logic for processing text (e.g., summarization or cleaning)
    return input_text
# Process live audio and convert to notes (this function is now synchronous)
def process_live_audio(live_audio_file):
    try:
        # Save the uploaded live audio temporarily
        audio_file_path = "temp_live_audio.wav"
        with open(audio_file_path, "wb") as f:
            f.write(live_audio_file.file.read())  # Read from the file object synchronously

        # Use the speech recognition library to convert audio to text
        recognizer = sr.Recognizer()
        with sr.AudioFile(audio_file_path) as source:
            audio = recognizer.record(source)  # Read the audio file

        # Recognize the speech in the audio file and convert to text
        try:
            text = recognizer.recognize_google(audio)
        except sr.UnknownValueError:
            text = "Sorry, I couldn't understand the audio."
        except sr.RequestError:
            text = "Sorry, there was an error with the speech recognition service."

        # Clean up the temporary file
        os.remove(audio_file_path)

        # You can integrate with GPT or another model here to generate structured notes from the text
        notes_content = f"Transcribed text: {text}"

        return notes_content

    except Exception as e:
        raise ValueError(f"Live audio processing failed: {str(e)}")