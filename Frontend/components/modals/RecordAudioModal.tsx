'use client'

import { X, ChevronDown, Mic, ChevronLeft } from 'lucide-react'

const RecordAudioModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[4vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center mb-3 p-4">
          <h2 className="text-2xl font-semibold text-white">Record audio</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Topic of recording (optional)"
            className="w-full p-4 text-sm rounded-xl border border-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4 p-4">
          <label className="block text-xl text-white mb-4">Audio language</label>
          <div className="relative">
            <select
              className="w-full p-4 text-sm rounded-xl border border-white-200 text-gray-400 bg-black appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              defaultValue="English"
            >
              <option>English</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="p-10 space-y-2">
          <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-2">
            <Mic className="w-4 h-4" />
            <span className="text-base">Start recording</span>
          </button>

          <button 
            onClick={onClose}
            className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-base">More note options</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecordAudioModal

