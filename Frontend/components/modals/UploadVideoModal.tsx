'use client'

import { X, Upload, ChevronLeft } from 'lucide-react'

const UploadVideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Upload video</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        <div>
          <label className="block text-xl text-white mb-6">Select:</label>
          <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-4">
            <Upload className="w-6 h-6" />
            <span className="text-xl">Select video file</span>
          </button>
        </div>

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

export default UploadVideoModal

