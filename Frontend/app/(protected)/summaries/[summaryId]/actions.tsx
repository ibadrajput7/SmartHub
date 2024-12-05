// actions.tsx

'use server'

import { cookies } from "next/headers"
import { SummaryData } from '../types'

export async function getSummaryById(summaryId: string): Promise<SummaryData | null> {
  const accessToken = cookies().get("access_token")?.value
  const response = await fetch(`http://127.0.0.1:5000/api/summaries/${summaryId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  return data.result as SummaryData
}