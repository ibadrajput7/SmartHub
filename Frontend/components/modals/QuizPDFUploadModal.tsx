'use client'

import { X, Upload, FileText, ChevronLeft } from 'lucide-react'

const QuizPDFUploadModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[4vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center mb-1 p-4">
          <h2 className="text-2xl font-semibold text-white">Upload PDF</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>
        
        <div className="p-4">
          <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-3 rounded-xl flex items-center gap-3 justify-center mb-4 transition-colors">
            <Upload className="w-4 h-4 text-gray-400" />
            <span className="text-purple-200 text-md">Upload PDF file</span>
          </button>
        
          <div className="p-4 space-y-2">
            <div> 
              <label className="block text-base mb-2 text-white">Quiz Type</label>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">MCQ's</button>
                <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">Q&A</button>
                <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">T/F</button>
              </div>
            </div>

            <div>
              <label className="block text-base mb-2 mt-6 text-white">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">Easy</button>
                <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">Medium</button>
                <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">Hard</button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl flex items-center gap-3 justify-center mb-2 transition-colors">
            <FileText className="w-4 h-4" />
            <span className="text-base">Generate Quiz</span>
          </button>

          <button 
            onClick={onClose}
            className="w-full bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl flex items-center justify-center gap-3 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-base">More options</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizPDFUploadModal

