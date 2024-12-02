'use client'

import { X, FileText, ChevronLeft } from 'lucide-react'

const QuizEnterTopicModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[2vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center mb-1 p-4">
          <h2 className="text-2xl font-semibold text-white">Enter Topic:</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>
        
        <div className="p-5">
          <label className="block text-sm text-white mb-4">Topic:</label>
          <input
            type="text"
            placeholder=""
            className="w-full p-2 text-xs rounded-xl border border-white-200 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
          />
        
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

export default QuizEnterTopicModal

