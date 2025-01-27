'use server'

import { cookies } from "next/headers"
import { NoteResponse, ParsedNote } from '@/app/(protected)/notes/types'

export async function getAllNotes(): Promise<ParsedNote[]> {
  try {
    const accessToken = cookies().get("access_token")?.value
    if (!accessToken) {
      throw new Error('No access token found')
    }

    // Updated URL to match FastAPI router prefix
    const response = await fetch('http://127.0.0.1:5000/api/notes/user/notes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error (${response.status}):`, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const notes: NoteResponse[] = await response.json()
    
    return notes.map((note) => ({
      id: note.id,
      title: note.title,
      content: tryParseJSON(note.content) || note.content,
      createdAt: note.created_at,
      userId: note.user_id
    }))
  } catch (error) {
    console.error('Error fetching notes:', error)
    return [] // Return empty array instead of throwing
  }
}

function tryParseJSON(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    return text // Return original text if parsing fails
  }
}