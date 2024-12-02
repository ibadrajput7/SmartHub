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

