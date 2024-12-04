'use client'

import { useState } from 'react'
import { X, FileText, ChevronLeft } from 'lucide-react'
import { generateNotesFromYouTube } from '@/app/(protected)/dashboard/actions'

const YoutubeVideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [generatedNotes, setGeneratedNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleGenerateNotes = async () => {
    setIsLoading(true)
    try {
      const notes = await generateNotesFromYouTube(youtubeUrl)
      setGeneratedNotes(notes)
    } catch (error) {
      console.error('Error generating notes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Youtube Video</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        <div className="space-y-2 mt-6">
          <label className="text-xl text-white">Link</label>
          <input 
            type="text"
            placeholder="youtube.com/watch/128"
            className="w-full p-4 rounded-xl border border-white-200 text-gray-400 bg-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </div>

        <button 
          className="mt-16 w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-4"
          onClick={handleGenerateNotes}
          disabled={isLoading}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xl font-medium">
            {isLoading ? 'Generating...' : 'Generate notes'}
          </span>
        </button>

        <button 
          onClick={onClose}
          className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-medium">More note options</span>
        </button>

        {generatedNotes && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Generated Notes:</h3>
            <div className="bg-black p-4 rounded-xl text-purple-200">
              {generatedNotes}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default YoutubeVideoModal

