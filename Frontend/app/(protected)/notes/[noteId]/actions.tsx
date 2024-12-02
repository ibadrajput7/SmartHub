'use server'

import { cookies } from "next/headers"
import { NoteData, Note } from '../types'

export async function getNoteById(noteId: string): Promise<NoteData | null> {
    const accessToken = cookies().get("access_token")?.value
    const response = await fetch(`http://127.0.0.1:5000/api/notes/${noteId}`, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    })
  
    if (!response.ok) {
      return null
    }
  
    const data = await response.json()
    const result = data.result as NoteData
    
    // Parse the JSON string in the content field
    result.notes = JSON.parse(result.content) as Note[]
    
    return result
}

