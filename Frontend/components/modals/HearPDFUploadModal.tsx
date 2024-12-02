'use client'

import { X, Upload, Radio, ChevronLeft } from 'lucide-react'

const HearPDFUploadModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Upload PDF</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        <div className="bg-black hover:bg-purple-600 text-purple-200 rounded-xl p-6 flex items-center gap-3 mb-6 cursor-pointer transition-colors">
          <Upload className="w-6 h-6 text-purple-200" />
          <span className="text-purple-200 text-lg">Upload PDF file</span>
        </div>

        <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 justify-center mb-4 transition-colors">
          <Radio className="w-6 h-6" />
          <span className="text-lg">Hear your notes</span>
        </button>

        <button 
          onClick={onClose}
          className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 justify-center  transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg">More options</span>
        </button>
      </div>
    </div>
  )
}

export default HearPDFUploadModal

