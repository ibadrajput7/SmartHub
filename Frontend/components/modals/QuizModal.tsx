
'use client'

import { useState } from 'react'
import { X, Youtube, FileText } from 'lucide-react'
import YoutubeVideoModal from './YoutubeVideoModal'
import TextUploadModal from './TextUploadModal'
import AudioUploadModal from './AudioUploadModal'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
}

const QuizModal = ({ isOpen, onClose }: QuizModalProps) => {
  const [showYoutubeVideoModal, setShowYoutubeVideoModal] = useState(false)
  const [showTextUploadModal, setShowTextUploadModal] = useState(false)
  const [showAudioUploadModal, setShowAudioUploadModal] = useState(false)

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
          <div className="p-6 pb-2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Generate Quizzes</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-purple-600 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-purple-200" />
              </button>
            </div>
          </div>

          <div className="p-8 space-y-2">
            <button
              className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 transition-colors"
              onClick={() => setShowYoutubeVideoModal(true)}
            >
              <Youtube className="w-6 h-6" />
              <span className="text-xl">YouTube Video</span>
            </button>

            <button
              className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 transition-colors"
              onClick={() => setShowTextUploadModal(true)}
            >
              <FileText className="w-6 h-6" />
              <span className="text-xl">Upload Text</span>
            </button>

            <button
              className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 transition-colors"
              onClick={() => setShowAudioUploadModal(true)}
            >
              <FileText className="w-6 h-6" />
              <span className="text-xl">Upload Audio</span>
            </button>
          </div>
        </div>
      </div>

      <YoutubeVideoModal
        isOpen={showYoutubeVideoModal}
        onClose={() => setShowYoutubeVideoModal(false)}
        mode="quiz"
      />

      <TextUploadModal
        isOpen={showTextUploadModal}
        onClose={() => setShowTextUploadModal(false)}
        mode="quiz"
      />

      <AudioUploadModal
        isOpen={showAudioUploadModal}
        onClose={() => setShowAudioUploadModal(false)}
        mode="quiz"
      />
    </>
  )
}

export default QuizModal

