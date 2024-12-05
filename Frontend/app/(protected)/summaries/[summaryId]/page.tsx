// app/(protected)/summaries/[summaryId]/page.tsx

import { getSummaryById } from '@/app/(protected)/summaries/[summaryId]/actions'
// import { SummaryData } from '@/app/(protected)/summaries/types'

export default async function SummaryPage({ params }: { params: { summaryId: string } }) {
  const summaryData = await getSummaryById(params.summaryId)

  if (!summaryData) {
    return <div className="text-center text-white">Summary not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-white">{summaryData.title}</h1>
      <div className="bg-gray-800 p-6 rounded-lg text-white">
        <p>{summaryData.content}</p>
      </div>
    </div>
  )
}