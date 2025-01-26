from youtube_transcript_api import YouTubeTranscriptApi
from openai import OpenAI
from functools import lru_cache
import re
import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('sk-proj-CnzxwC0PM5KIeHIPmrgmT3BlbkFJoTCuJMzbdAo8DuhlnPhz'))

@lru_cache(maxsize=100)
def preprocess_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^a-z\s]', ' ', text)
    return ' '.join(text.split())

def get_video_id(url: str) -> str:
    if 'youtube.com' in url:
        return url.split("watch?v=")[1].split("&")[0]
    return url.split("youtu.be/")[1].split("?")[0]

def get_transcript(video_id: str) -> str:
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    return " ".join([entry["text"] for entry in transcript])

def get_gpt_analysis(transcript: str, topic: str) -> dict:
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "Analyze the transcript and topic relevance. Return JSON with: relevance_score (0-100), confidence_level, topic_keywords"
                },
                {
                    "role": "user", 
                    "content": f"Topic: {topic}\nTranscript: {transcript[:4000]}..."
                }
            ],
            temperature=0.7,
            max_tokens=300
        )
        # Parse the response content
        result = json.loads(response.choices[0].message.content)
        return result
    except Exception as e:
        print(f"Error in GPT analysis: {str(e)}")
        return {
            "relevance_score": 0,
            "confidence_level": "low",
            "topic_keywords": []
        }

def calculate_relevance_score(topic: str, transcript: str) -> dict:
    topic_clean = preprocess_text(topic)
    transcript_clean = preprocess_text(transcript)
    
    # TF-IDF Analysis
    vectorizer = TfidfVectorizer(ngram_range=(1, 2))
    tfidf_matrix = vectorizer.fit_transform([topic_clean, transcript_clean])
    tfidf_score = float(cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0])
    
    # GPT Analysis
    gpt_result = get_gpt_analysis(transcript_clean, topic_clean)
    
    # Combine scores (70% GPT, 30% TF-IDF)
    final_score = (gpt_result['relevance_score'] * 0.7) + (tfidf_score * 100 * 0.3)
    
    return {
        "score": round(min(100, final_score), 2),
        "confidence": gpt_result['confidence_level'],
        "topic_keywords": gpt_result['topic_keywords'],
        "topic_coverage": round(final_score * 0.9, 2)
    }