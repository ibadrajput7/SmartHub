'use client'

import { useState } from 'react'
import { X, Upload, Mic, Type, Youtube, ChevronLeft, FileText } from 'lucide-react'
import AudioUploadModal from './AudioUploadModal'
import EnterTopicModal from './EnterTopicModal'
import TextUploadModal from './TextUploadModal'
import YoutubeVideoModal from './YoutubeVideoModal'
import GeneratedNotes from '../GeneratedNotes'

const GenerateNotesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [showAudioUpload, setShowAudioUpload] = useState(false)
  const [showEnterTopic, setShowEnterTopic] = useState(false)
  const [showYoutubeVideo, setShowYoutubeVideo] = useState(false)
  const [showTextUpload, setShowTextUpload] = useState(false)
  const [generatedNotes, setGeneratedNotes] = useState<any>(null)

  if (!isOpen) return null

  const handleNotesGenerated = (notes: any) => {
    setGeneratedNotes(notes)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh]">
        <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 pb-2">
            <h2 className="text-2xl font-semibold">
              <span className="text-white">Get </span>
              <span className="text-purple-600 ml-2">instant notes</span>
              <span className="text-white ml-2">:</span>
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-purple-600 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-purple-200" />
            </button>
          </div>

          {/* Modal Content */}
          {generatedNotes ? (
            <div className="p-6 pt-2">
              <GeneratedNotes
                notes={generatedNotes.notes}
                totalScore={generatedNotes.total_score}
                feedback={generatedNotes.feedback}
              />
              <button
                onClick={() => setGeneratedNotes(null)}
                className="w-full mt-4 bg-purple-600 text-white hover:bg-purple-700 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
              >
                Generate More Notes
              </button>
            </div>
          ) : (
            <div className="p-6 pt-2 space-y-3">
              <button className="w-full bg-black text-purple-200 hover:bg-purple-600 transition-colors p-4 rounded-xl flex items-center gap-3 text-left" onClick={() => setShowAudioUpload(true)}>
                <Upload className="w-6 h-6" />
                <span className="text-lg">Upload audio</span>
              </button>

              <button className="w-full bg-black text-purple-200 hover:bg-purple-600 transition-colors p-4 rounded-xl flex items-center gap-3 text-left" onClick={() => setShowEnterTopic(true)}>
                <Type className="w-6 h-6" />
                <span className="text-lg">Enter topic</span>
              </button>

              <button className="w-full bg-black text-purple-200 hover:bg-purple-600 transition-colors p-4 rounded-xl flex items-center gap-3 text-left" onClick={() => setShowTextUpload(true)}>
                <Upload className="w-6 h-6" />
                <span className="text-lg">Upload text</span>
              </button>

              <button className="w-full bg-black text-purple-200 hover:bg-purple-600 transition-colors p-4 rounded-xl flex items-center gap-3 text-left" onClick={() => setShowYoutubeVideo(true)}>
                <Youtube className="w-6 h-6" />
                <span className="text-lg">YouTube video</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <AudioUploadModal 
        isOpen={showAudioUpload}
        onClose={() => setShowAudioUpload(false)}
        mode='notes'
        // onNotesGenerated={handleNotesGenerated}
      />

      <EnterTopicModal
        isOpen={showEnterTopic}
        onClose={() => setShowEnterTopic(false)}
      />

      <TextUploadModal
        isOpen={showTextUpload}
        onClose={() => setShowTextUpload(false)}
        mode='notes'
      />

      <YoutubeVideoModal
        isOpen={showYoutubeVideo}
        onClose={() => setShowYoutubeVideo(false)}
        mode="notes"
      />
    </>
  )
}

export default GenerateNotesModal

