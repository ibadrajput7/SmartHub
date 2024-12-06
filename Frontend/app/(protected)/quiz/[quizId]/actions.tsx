
'use server'

import { cookies } from "next/headers"
import { QuizData } from '../types'

export async function getQuizById(quizId: string): Promise<QuizData | null> {
  const accessToken = cookies().get("access_token")?.value
  const response = await fetch(`http://127.0.0.1:5000/api/quizzes/${quizId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  return data.result
}