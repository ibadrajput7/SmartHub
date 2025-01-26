import { getSummaryById } from '@/app/(protected)/summaries/[summaryId]/actions'
import DownloadSummaryButton from '@/components/Downloadpdf'

export default async function SummaryPage({ params }: { params: { summaryId: string } }) {
  const summaryData = await getSummaryById(params.summaryId)

  if (!summaryData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white text-xl">Summary not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/5 to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8 backdrop-blur-sm bg-gray-800/40 p-4 rounded-xl border border-purple-500/20">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
              {summaryData.title}
            </h1>
            <DownloadSummaryButton summary={summaryData} />
          </div>

          {/* Main Content Card */}
          <div className="relative overflow-hidden">
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

            {/* Content Container */}
            <div className="relative bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl
                         border-2 border-purple-500/10 shadow-2xl 
                         hover:border-purple-500/20 transition-all duration-300">
              
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 via-purple-600/2 to-transparent rounded-2xl" />
              
              {/* Content */}
              <div className="relative space-y-6">
                {summaryData.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="text-gray-100 leading-relaxed text-lg tracking-wide
                                          first-letter:text-2xl first-letter:text-purple-300
                                          first-letter:mr-1 first-letter:float-left">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/5 blur-3xl rounded-full" />
            </div>

            {/* Bottom Gradient Line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}