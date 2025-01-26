'use client'

import { X } from 'lucide-react'

interface ResultsProps {
  isOpen: boolean
  onClose: () => void
  results: {
    score: number
    confidence: string 
    topic_keywords: string[]
    topic_coverage: number
  }
  onAnalyzeAnother: () => void
}

const YouTubeAccuracyResults = ({ isOpen, onClose, results, onAnalyzeAnother }: ResultsProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-2xl font-semibold text-white">Analysis Results</h2>
          <button onClick={onClose} className="p-2 hover:bg-purple-600 rounded-full transition-colors">
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        <div className="p-6 pt-2 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-purple-200">Relevance Score</label>
              <p className="text-2xl font-bold text-white">{results.score}%</p>
            </div>
            
            <div>
              <label className="text-purple-200">Confidence Level</label>
              <p className="text-lg text-white">{results.confidence}</p>
            </div>

            <div>
              <label className="text-purple-200">Topic Keywords</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {results.topic_keywords.map((keyword, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-900/50 text-purple-200 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-purple-200">Topic Coverage</label>
              <p className="text-lg text-white">{results.topic_coverage}%</p>
            </div>
          </div>

          <button 
            onClick={onAnalyzeAnother}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl"
          >
            Analyze Another Video
          </button>
        </div>
      </div>
    </div>
  )
}

export default YouTubeAccuracyResults