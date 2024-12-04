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

// youtube functionality
export async function generateNotesFromYouTube(youtubeUrl: string) {
  const accessToken = cookies().get("access_token")?.value
    
  const response = await fetch('http://127.0.0.1:5000/api/youtube/notes', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: youtubeUrl }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate notes from YouTube video')
  }

  const data = await response.json()
  revalidatePath('/')
  return data.result
}

