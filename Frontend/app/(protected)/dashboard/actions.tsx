'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from "next/headers"

export async function generateNotes(formData: FormData) {

  const accessToken = cookies().get("access_token")?.value
    
  const response = await fetch('http://127.0.0.1:5000/api/audio/notes', {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to generate notes')
  }

  const data = await response.json()
  revalidatePath('/')
  return data.result
}

export async function generateSummaryFromAudio(formData: FormData) {
  try {
    const accessToken = cookies().get("access_token")?.value
    const response = await fetch('http://127.0.0.1:5000/api/audio/summary', {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to generate summary')
    }

    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Error in generateSummaryFromAudio:', error)
    throw error
  }
}

// youtube functionality
export async function generateNotesFromYouTube(youtubeUrl: string) {
  const accessToken = cookies().get('access_token')?.value;

  // Create a FormData object and append empty 'content' field
  const formData = new FormData();
  formData.append('content', '');

  // Build the request URL with the youtube_url as a query parameter
  const url = `http://127.0.0.1:5000/api/youtube/notes?youtube_url=${encodeURIComponent(youtubeUrl)}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // Do not set 'Content-Type' when sending FormData; the browser will set it automatically
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to generate notes from YouTube video');
  }

  const data = await response.json();
  console.log(data.result);
  revalidatePath('/');
  return data.result;
}

// text functionality
export async function generateNotesFromText(formData: FormData) {
  const accessToken = cookies().get('access_token')?.value

  // const formData = new FormData()
  // formData.append('content', text)

  const response = await fetch('http://127.0.0.1:5000/api/text/notes', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // Do not set 'Content-Type' when sending FormData
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to generate notes from text')
  }

  const data = await response.json()
  revalidatePath('/')
  return data.result
}


export async function generateSummaryFromYouTube(youtubeUrl: string) {
  const accessToken = cookies().get('access_token')?.value

  const formData = new FormData()
  formData.append('content', '')

  const url = `http://127.0.0.1:5000/api/youtube/summary?youtube_url=${encodeURIComponent(youtubeUrl)}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to generate summary from YouTube video')
  }

  const data = await response.json()
  return data.result
}

export async function generateSummaryFromText(formData: FormData) {
  const accessToken = cookies().get('access_token')?.value

  const response = await fetch('http://127.0.0.1:5000/api/text/summary', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // Do not set 'Content-Type' when sending FormData
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to generate summary from text')
  }

  const data = await response.json()
  revalidatePath('/')
  return data.result
}

// Name	Description
// source_type *
// string
// (path)
// Available values : text, audio, video, youtube, live


// youtube
// process_type *
// string
// (path)
// Available values : notes, summary, quiz, audio


// quiz
// youtube_url
// string($uri)
// (query)
// https://youtu.be/73xejdLWYfg?si=kaFDMu-t2hmgIn8u
// minLength: 1
// maxLength: 2083

// Curl

// curl -X 'POST' \
//   'http://127.0.0.1:5000/api/youtube/quiz?youtube_url=https%3A%2F%2Fyoutu.be%2F73xejdLWYfg%3Fsi%3DkaFDMu-t2hmgIn8u' \
//   -H 'accept: application/json' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4eXpAZXhhbXBsZS5jb20iLCJleHAiOjE3MzM0NDY4ODJ9.JuYaMP1YoPjO6ZKnqrUtnB1zlZEMkuSf6P9oXl_hvug' \
//   -H 'Content-Type: multipart/form-data' \
//   -F 'content='
// Request URL
// http://127.0.0.1:5000/api/youtube/quiz?youtube_url=https%3A%2F%2Fyoutu.be%2F73xejdLWYfg%3Fsi%3DkaFDMu-t2hmgIn8u
// Server response
// Code	Details
// 200	
// Response body
// Download
// {
//   "message": "Quiz generated successfully",
//   "source_type": "youtube",
//   "process_type": "quiz",
//   "result": {
//     "questions": [
//       {
//         "question": "What is one of the main reasons why most people underestimate the capabilities of large language models?",
//         "options": [
//           "They are too expensive to use",
//           "They are too slow to generate results",
//           "Complex tasks are not broken down into smaller subtasks",
//           "They are not widely available"
//         ],
//         "answer": "Complex tasks are not broken down into smaller subtasks"
//       },
//       {
//         "question": "What is one way to improve the quality of outputs generated by language models?",
//         "options": [
//           "Providing more data to the model",
//           "Breaking down tasks into smaller subtasks",
//           "Using more complex language models",
//           "Increasing the number of instructions given to the model"
//         ],
//         "answer": "Breaking down tasks into smaller subtasks"
//       },
//       {
//         "question": "What is the first step suggested in the video for processing long complex rfps?",
//         "options": [
//           "Passing the documents directly to a language model",
//           "Classifying pages as boilerplates or containing technical details",
//           "Creating a proposal draft based on the documents",
//           "Matching requirements against the product catalog"
//         ],
//         "answer": "Classifying pages as boilerplates or containing technical details"
//       }
//     ],
//     "quiz_saved": true
//   }
// }

// create funtion to generate quiz from youtube
export async function generateQuizFromYouTube(youtubeUrl: string) {
  const accessToken = cookies().get('access_token')?.value

  const formData = new FormData()
  formData.append('content', '')

  const url = `http://127.0.0.1:5000/api/youtube/quiz?youtube_url=${encodeURIComponent(youtubeUrl)}`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to generate quiz from YouTube video')
  }

  const data = await response.json()

  return data.result
}

// generate quiz from text
export async function generateQuizFromText(formData: FormData) {
  const accessToken = cookies().get('access_token')?.value

  const response = await fetch('http://127.0.0.1:5000/api/text/quiz', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to generate quiz from text')
  }

  const data = await response.json()

  return data.result

}

// generate quiz from audio

export async function generateQuizFromAudio(formData: FormData) {
  const accessToken = cookies().get('access_token')?.value

  const response = await fetch('http://127.0.0.1:5000/api/audio/quiz', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to generate quiz from audio')
  }

  const data = await response.json()

  return data.result
}

// Add interface for API response
interface AnalysisResponse {
  score: number
  confidence: string
  topic_keywords: string[]
  topic_coverage: number
}

// Update analyzeYoutubeVideo function
export async function analyzeYoutubeVideo(url: string, topic: string): Promise<AnalysisResponse> {
  const accessToken = cookies().get('access_token')?.value

  try {
    // Update endpoint path to match backend
    const response = await fetch('http://127.0.0.1:5000/analyze-video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        topic: topic
      })
    })

    if (!response.ok) {
      // Get error message from response if available
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || 'Failed to analyze video')
    }

    const data = await response.json()
    return {
      score: data.score || 0,
      confidence: data.confidence || 'low',
      topic_keywords: data.topic_keywords || [],
      topic_coverage: data.topic_coverage || 0
    }
  } catch (error) {
    console.error('Video analysis error:', error)
    throw error instanceof Error ? error : new Error('Failed to analyze video')
  }
}


// hearing your notes


export async function fileToAudio(formData: FormData) {
  'use server'
  
  try {
    const accessToken = cookies().get("access_token")?.value;
    
    const response = await fetch('http://127.0.0.1:5000/file-to-audio', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to process audio');
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:audio/mpeg;base64,${base64}`;
    
    return { url: dataUrl, headers: {} };

  } catch (error) {
    console.error('File to audio error:', error);
    throw error;
  }
}