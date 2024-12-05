// YoutubeVideoModal.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, FileText, ChevronLeft } from 'lucide-react'
import { generateNotesFromYouTube } from '@/app/(protected)/dashboard/actions'
import { generateSummaryFromYouTube } from '@/app/(protected)/dashboard/actions'

interface YoutubeVideoModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'notes' | 'summary'
}

const YoutubeVideoModal = ({ isOpen, onClose, mode }: YoutubeVideoModalProps) => {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  if (!isOpen) return null

  const handleGenerate = async () => {
    if (!youtubeUrl) {
      setError('Please enter a YouTube URL')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      let result
      if (mode === 'notes') {
        result = await generateNotesFromYouTube(youtubeUrl)
        router.push(`/notes/${result.note_id}`)
      } else if (mode === 'summary') {
        result = await generateSummaryFromYouTube(youtubeUrl)
        router.push(`/summaries/${result.note_id}`)
      }
      onClose()
    } catch (err) {
      console.error('Error generating:', err)
      setError('Failed to generate. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-white">YouTube Video</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        <div className="space-y-2 mt-6">
          <label className="text-xl text-white">YouTube Link</label>
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full p-4 rounded-xl border border-white-200 text-gray-400 bg-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </div>

        <button
          className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xl font-medium">
            {isLoading ? 'Generating...' : `Generate ${mode === 'summary' ? 'Summary' : 'Notes'}`}
          </span>
        </button>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-medium">More options</span>
        </button>

        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
      </div>
    </div>
  )
}

export default YoutubeVideoModal