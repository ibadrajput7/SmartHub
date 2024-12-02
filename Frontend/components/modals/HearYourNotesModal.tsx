'use client'

import { useState } from 'react'
import { X, Upload, FileText } from 'lucide-react'
import HearPDFUploadModal from './HearPDFUploadModal'
import HearTextUploadModal from './HearTextUploadModal'

const HearYourNotesModal = ({ isOpen, onClose }) => {
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
                <span className="text-white">Hear </span>
                <span className="text-purple-600">your notes</span>
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

          <div className="p-6 space-y-4">
            <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 transition-colors" onClick={() => setShowPDFUpload(true)}>
              <div className="p-2 rounded-lg">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xl">Upload PDF</span>
            </button>

            <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 transition-colors" onClick={() => setShowTextUpload(true)}>
              <div className="p-2 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xl">Upload Text</span>
            </button>
          </div>
        </div>
      </div>

      <HearPDFUploadModal isOpen={showPDFUpload} onClose={() => setShowPDFUpload(false)}/>
      <HearTextUploadModal isOpen={showTextUpload} onClose={() => setShowTextUpload(false)}/> 
    </>
  )
}

export default HearYourNotesModal

