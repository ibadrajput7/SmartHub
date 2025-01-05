'use client'

import { X, Youtube } from 'lucide-react'

const YouTubeAccuracyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-2xl font-semibold">
              <span className="text-white">Youtube</span>
              <span className="text-purple-600 ml-2">Video</span>
              <span className="text-white ml-2">:</span>
            </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        <div className="p-6 pt-2 space-y-6">
          <div className="space-y-2 mt-6">
            <label className="text-xl text-white">Link</label>
            <input 
              type="text"
              placeholder="youtube.com/watch/128"
              className="w-full p-4 rounded-xl border border-white-200 text-gray-400 bg-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button className="mt-6 w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors">
            <Youtube className="w-6 h-6" />
            <span className="text-xl">Check Video Accuracy</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default YouTubeAccuracyModal

