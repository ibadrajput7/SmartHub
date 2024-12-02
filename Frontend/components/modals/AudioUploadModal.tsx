'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Upload, ChevronLeft } from 'lucide-react'
import { generateNotes } from '@/app/(protected)/dashboard/actions'

interface AudioUploadModalProps {
  isOpen: boolean
  onClose: () => void
}

const AudioUploadModal = ({ isOpen, onClose }: AudioUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [language, setLanguage] = useState('English')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleGenerateNotes = async () => {
    if (!file) {
      setError('Please select an audio file')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('content', file)
      const result = await generateNotes(formData)
      router.push(`/notes/${result.note_id}`)
      onClose()
    } catch (err) {
      setError('Failed to generate notes. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-2xl font-semibold text-white">Upload Audio File</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-2">
            <label htmlFor="audio-language" className="text-xl text-white">Audio language</label>
            <div className="relative">
              <select
                id="audio-language"
                className="w-full p-4 rounded-xl border border-white-200 appearance-none bg-black text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Italian</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <ChevronLeft className="w-5 h-5 text-gray-500 rotate-90" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
              id="audio-file-input"
            />
            <label
              htmlFor="audio-file-input"
              className="w-full bg-black text-purple-200 hover:bg-purple-600 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span className="text-base">{file ? file.name : 'Select audio file'}</span>
            </label>

            <button
              onClick={handleGenerateNotes}
              disabled={isLoading || !file}
              className="w-full bg-purple-600 text-white hover:bg-purple-700 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Notes'}
            </button>

            <button
              onClick={onClose} 
              className="w-full bg-black text-purple-200 hover:bg-purple-600 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-base">More note options</span>
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AudioUploadModal

