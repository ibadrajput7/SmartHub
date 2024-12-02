'use client'

import { useState } from 'react'
import { X, Upload, FileText } from 'lucide-react'
import QuizPDFUploadModal from './QuizPDFUploadModal'
import QuizEnterTopicModal from './QuizEnterTopicModal'

const QuizModal = ({ isOpen, onClose }) => {
  const [showPDFUpload, setShowPDFUpload] = useState(false)
  const [showTextUpload, setShowTextUpload] = useState(false)

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
        <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
          <div className="p-6 pb-2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                <span className="text-white">Generate </span>
                <span className="text-purple-600">Multiple Quizzes</span>
                <span className="text-gray-900">:</span>
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-purple-600 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-purple-200" />
              </button>
            </div>
          </div>

          <div className="p-8 space-y-2 mt-6">
            <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-3 rounded-xl flex items-center gap-3 transition-colors" onClick={() => setShowPDFUpload(true)}>
              <div className="p-2 rounded-lg">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xl">Upload PDF</span>
            </button>

            <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-3 rounded-xl flex items-center gap-3 transition-colors" onClick={() => setShowTextUpload(true)}>
              <div className="p-2 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xl">Enter Topic</span>
            </button>
          </div>
        </div>
      </div>

      <QuizPDFUploadModal isOpen={showPDFUpload} onClose={() => setShowPDFUpload(false)}/>
      <QuizEnterTopicModal isOpen={showTextUpload} onClose={() => setShowTextUpload(false)}/>
    </>
  )
}

export default QuizModal

