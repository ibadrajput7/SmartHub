'use server'

import { cookies } from "next/headers"
import { NoteData } from '@/app/(protected)/notes/types'

export async function getAllNotes(): Promise<NoteData[]> {
  const accessToken = cookies().get("access_token")?.value
  const response = await fetch('http://127.0.0.1:5000/api/notes', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    return []
  }

  const data = await response.json()
  return data.results.map((note: NoteData) => ({
    ...note,
    notes: JSON.parse(note.content)
  }))
}

