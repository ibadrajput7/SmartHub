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