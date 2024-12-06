// TextUploadModal.tsx

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, FileText, ChevronLeft, Upload } from 'lucide-react'
import { generateNotesFromText, generateSummaryFromText, generateQuizFromText } from '@/app/(protected)/dashboard/actions'

interface TextUploadModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'notes' | 'summary' | 'quiz'
}

const TextUploadModal = ({ isOpen, onClose, mode }: TextUploadModalProps) => {
  const [text, setText] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === 'text/plain') {
        const reader = new FileReader()
        reader.onload = (e) => {
          const fileContent = e.target?.result
          setText(fileContent as string)
        }
        reader.onerror = () => {
          setError('Failed to read file')
        }
        reader.readAsText(selectedFile)
        setFile(selectedFile)
      } else {
        setError('Please upload a .txt file')
      }
    }
  }

  if (!isOpen) return null

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter text or upload a .txt file')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('content', text)

      let result
      if (mode === 'notes') {
        result = await generateNotesFromText(formData)
        router.push(`/notes/${result.note_id}`)
      } else if (mode === 'summary') {
        result = await generateSummaryFromText(formData)
        router.push(`/summaries/${result.note_id}`)
      } else if (mode === 'quiz') {
        result = await generateQuizFromText(formData)
        router.push(`/quiz/${result.quiz_id}`)
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-2xl font-semibold text-white">Upload or Enter Text</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="text-input" className="text-xl text-white">Your Text</label>
            <textarea
              id="text-input"
              className="w-full h-40 p-4 rounded-xl border border-gray-200 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Enter or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="hidden"
              id="text-file-input"
            />
            <label
              htmlFor="text-file-input"
              className="w-full bg-black text-purple-200 hover:bg-purple-600 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span className="text-base">{file ? file.name : 'Select .txt file'}</span>
            </label>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !text.trim()}
            className="w-full bg-purple-600 text-white hover:bg-purple-700 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-6 h-6" />
            <span className="text-xl font-medium">
              {isLoading ? 'Generating...' : `Generate ${mode === 'summary' ? 'Summary' : 'Notes'}`}
            </span>
          </button>

          <button
            onClick={onClose}
            className="w-full bg-black text-purple-200 hover:bg-purple-600 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-base">More options</span>
          </button>

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TextUploadModal