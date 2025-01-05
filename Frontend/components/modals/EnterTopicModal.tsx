'use client'

import { X, FileText, ChevronLeft } from 'lucide-react'

const EnterTopicModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Enter topic</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        <div className="mb-8">
          <label className="block text-xl text-white mb-4">Topic:</label>
          <input
            type="text"
            placeholder="Enter your topic"
            className="w-full p-4 text-lg rounded-xl border border-white-200 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          />
        </div>

        <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-4">
          <FileText className="w-6 h-6" />
          <span className="text-xl font-medium">Generate notes</span>
        </button>

        <button 
          onClick={onClose}
          className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-medium">More note options</span>
        </button>
      </div>
    </div>
  )
}

export default EnterTopicModal

