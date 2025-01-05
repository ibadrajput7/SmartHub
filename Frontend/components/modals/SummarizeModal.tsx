// SummarizeModal.tsx

'use client'

import { useState } from 'react'
import { X, Youtube, FileText } from 'lucide-react'
import YoutubeVideoModal from './YoutubeVideoModal'
import TextUploadModal from './TextUploadModal'
import AudioUploadModal from './AudioUploadModal'

interface SummarizeModalProps {
  isOpen: boolean
  onClose: () => void
}

const SummarizeModal = ({ isOpen, onClose }: SummarizeModalProps) => {
  const [showYoutubeVideoModal, setShowYoutubeVideoModal] = useState(false)
  const [showTextUploadModal, setShowTextUploadModal] = useState(false)
  const [showAudioUploadModal, setShowAudioUploadModal] = useState(false)

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh]">
        <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
          <div className="p-6 pb-2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
              <span className="text-white">Summarize</span>
              <span className="text-purple-600 ml-2">Your Content</span>
              <span className="text-white ml-2">:</span>
            </h2>
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
        mode="summary"
      />

      <TextUploadModal
        isOpen={showTextUploadModal}
        onClose={() => setShowTextUploadModal(false)}
        mode="summary"
      />

      <AudioUploadModal
        isOpen={showAudioUploadModal}
        onClose={() => setShowAudioUploadModal(false)}
        mode="summary"
      />
    </>
  )
}

export default SummarizeModal