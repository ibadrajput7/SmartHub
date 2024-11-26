import os
import speech_recognition as sr
from moviepy.editor import VideoFileClip
from youtube_dl import YoutubeDL

# Function to transcribe audio
def process_audio(file):
    recognizer = sr.Recognizer()
    with sr.AudioFile(file) as source:
        audio = recognizer.record(source)
    return recognizer.recognize_google(audio)

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
