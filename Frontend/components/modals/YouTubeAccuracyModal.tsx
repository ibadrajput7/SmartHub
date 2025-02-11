'use client'

import { useState } from 'react'
import { X, Youtube } from 'lucide-react'
import { analyzeYoutubeVideo } from '@/app/(protected)/dashboard/actions'
import { toast } from 'sonner'
import YouTubeAccuracyResults from '@/components/YoutubeAccuracy/YoutubeAccuracyResults'

const YouTubeAccuracyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [url, setUrl] = useState('')
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)

  if (!isOpen) return null

  const handleAnalyze = async () => {
    if (!url || !topic) {
      toast.error('Please provide both URL and topic')
      return
    }

    try {
      setLoading(true)
      const data = await analyzeYoutubeVideo(url, topic)
      setResults(data)
      setShowResults(true)
    } catch (error) {
      toast.error('Failed to analyze video')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setUrl('')
    setTopic('')
    setResults(null)
    setShowResults(false)
  }

  if (showResults && results) {
    return (
      <YouTubeAccuracyResults
        isOpen={true}
        onClose={onClose}
        results={results}
        onAnalyzeAnother={handleReset}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-2xl font-semibold">
            <span className="text-white">Youtube</span>
            <span className="text-purple-600 ml-2">Video</span>
            <span className="text-white ml-2">Analysis</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        <div className="p-6 pt-2 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-lg text-white mb-2 block">YouTube URL</label>
              <input 
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full p-4 rounded-xl border border-white-200 text-gray-400 bg-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-lg text-white mb-2 block">Topic</label>
              <input 
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic to analyze..."
                className="w-full p-4 rounded-xl border border-white-200 text-gray-400 bg-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              'Analyzing...'
            ) : (
              <>
                <Youtube className="w-6 h-6" />
                <span className="text-xl">Analyze Video</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default YouTubeAccuracyModal