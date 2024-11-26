import React, { useState } from 'react';
import { FileText, HelpCircle, Radio, Youtube, X, ChevronLeft, ChevronDown, Upload, Mic, Type} from 'lucide-react';
import Sider from '../components/Sider';

// Generate Notes
const GenerateNotesModal = ({ isOpen, onClose }) => {
  const [showAudioUpload, setShowAudioUpload] = useState(false);
  const [showRecordAudio, setShowRecordAudio] = useState(false);
  const [showEnterTopic, setShowEnterTopic] = useState(false);
  const [showUploadVideo, setShowUploadVideo] = useState(false);
  const [showYoutubeVideo, setShowYoutubeVideo] = useState(false);

  if (!isOpen) return null;

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
        <div className="p-6 pt-2 space-y-3">
          
          {/* Upload Audio Button */}
          <button className="w-full bg-black text-purple-200 hover:bg-purple-600 transition-colors p-4 rounded-xl flex items-center gap-3 text-left" onClick={() => setShowAudioUpload(true)}>
            <Upload className="w-6 h-6" />
            <span className="text-lg">Upload audio</span>
          </button>

          {/* Record Audio Button */}
          <button className="w-full bg-black text-purple-200 hover:bg-purple-600 transition-colors p-4 rounded-xl flex items-center gap-3 text-left" onClick={() => setShowRecordAudio(true)}>
            <Mic className="w-6 h-6 text-red-400" />
            <span className="text-lg">Record audio</span>
          </button>

          {/* Enter Topic Button */}
          <button className="w-full bg-black text-purple-200 hover:bg-purple-600 transition-colors p-4 rounded-xl flex items-center gap-3 text-left" onClick={() => setShowEnterTopic(true)}>
            <Type className="w-6 h-6" />
            <span className="text-lg">Enter topic</span>
          </button>

          {/* Upload Video Button */}
          <button className="w-full bg-black text-purple-200 hover:bg-purple-600 transition-colors p-4 rounded-xl flex items-center gap-3 text-left" onClick={() => setShowUploadVideo(true)}>
            <Upload className="w-6 h-6" />
            <span className="text-lg">Upload video</span>
          </button>

          {/* YouTube Video Button */}
          <button className="w-full bg-black text-purple-200 hover:bg-purple-600 transition-colors p-4 rounded-xl flex items-center gap-3 text-left" onClick={() => setShowYoutubeVideo(true)}>
            <Youtube className="w-6 h-6" />
            <span className="text-lg">YouTube video</span>
          </button>
        </div>
      </div>
    </div>

    <AudioUploadModal 
    isOpen={showAudioUpload}
    onClose={() => setShowAudioUpload(false)}
  />
  
  <RecordAudioModal
    isOpen={showRecordAudio}
    onClose={() => setShowRecordAudio(false)}
  />

  <EnterTopicModal
    isOpen={showEnterTopic}
    onClose={() => setShowEnterTopic(false)}
  />

  <UploadVideoModal
    isOpen={showUploadVideo}
    onClose={() => setShowUploadVideo(false)}
  />

  <YoutubeVideoModal
    isOpen={showYoutubeVideo}
    onClose={() => setShowYoutubeVideo(false)}
  />

  </>
  );
};

//Get instant notes audio upload
const AudioUploadModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Close button in top right */}
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-2xl font-semibold text-white">Upload Audio File</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-8">
        
         {/* Language Selection */}
          <div className="space-y-2">
            <label className="text-xl text-white">Audio language</label>
            <div className="relative">
              <select className="w-full p-4 rounded-xl border border-white-200 appearance-none bg-black text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>English</option>

              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          {/* Upload Button */}
          <div className="p-8 space-y-2">
          <button className="w-full bg-black text-purple-200 hover:bg-purple-600 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors">
            <Upload className="w-4 h-4" />
            <span className="text-base">Select audio file</span>
          </button>

          {/* More Options Button */}
          <button onClick={onClose} 
              className="w-full bg-black text-purple-200 hover:bg-purple-600 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-base">More note options</span>
          </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

// record audio
const RecordAudioModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[4vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Modal Header with Close Button */}
        <div className="flex justify-between items-center mb-3 p-4">
          <h2 className="text-2xl font-semibold text-white">Record audio</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        {/* Topic Input Section */}
        <div className=" p-4">
          <input
            type="text"
            placeholder="Topic of recording (optional)"
            className="w-full p-4 text-sm rounded-xl border border-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Audio Language Section */}
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

        {/* Start Recording Button */}
        <div className="p-10 space-y-2">
        <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-2">
          <Mic className="w-4 h-4" />
          <span className="text-base">Start recording</span>
        </button>

        {/* More Note Options Button */}
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
  );
};

// enter topic
const EnterTopicModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
        {/* Modal Header with Close Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Enter topic</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        {/* Topic Input Section */}
        <div className="mb-8">
          <label className="block text-xl text-white mb-4">Topic:</label>
          <input
            type="text"
            placeholder="Enter your topic"
            className="w-full p-4 text-lg rounded-xl border border-white-200 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          />
        </div>

        {/* Generate Notes Button */}
        <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-4">
          <FileText className="w-6 h-6" />
          <span className="text-xl font-medium">Generate notes</span>
        </button>

        {/* More Note Options Button */}
        <button 
          onClick={onClose}
          className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-medium">More note options</span>
        </button>
      </div>
    </div>
  );
};

// upload video
const UploadVideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
        {/* Modal Header with Close Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Upload video</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        {/* Video Language Selection */}
        <div>
          <label className="block text-xl text-white mb-6">Select:</label>
          <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-4">
            <Upload className="w-6 h-6" />
            <span className="text-xl">Select video file</span>
          </button>
        </div>

        {/* More Note Options Button */}
        <button 
          onClick={onClose}
          className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-medium">More note options</span>
        </button>
      </div>
    </div>
  );
};

// youtube video
const YoutubeVideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
        {/* Modal Header with Close Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Youtube Video</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        {/* Topic Input Section */}
        <div className="space-y-2 mt-6">
            <label className="text-xl text-white">Link</label>
            <input 
              type="text"
              placeholder="youtube.com/watch/128"
              className="w-full p-4 rounded-xl border border-white-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

        {/* Generate Notes Button */}
        <button className="mt-16 w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-4">
          <FileText className="w-6 h-6" />
          <span className="text-xl font-medium">Generate notes</span>
        </button>

        {/* More Note Options Button */}
        <button 
          onClick={onClose}
          className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xl font-medium">More note options</span>
        </button>
      </div>
    </div>
  );
};

// Generate quiz
const QuizModal = ({ isOpen, onClose }) => {
  const [showPDFUpload, setShowPDFUpload] = useState(false);
  const [showTextUpload, setShowTextUpload] = useState(false);

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Modal Header */}
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

        {/* Modal Content */}
        <div className="p-8 space-y-2 mt-6">
          {/* Upload PDF Button */}
          <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-3 rounded-xl flex items-center gap-3 transition-colors" onClick={() => setShowPDFUpload(true)}>
            <div className="p-2 rounded-lg">
              <Upload className="w-6 h-6" />
            </div>
            <span className="text-xl">Upload PDF</span>
          </button>

          {/* Upload Text Button */}
          <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-3 rounded-xl flex items-center gap-3 transition-colors" onClick={() => setShowTextUpload(true)}>
            <div className="p-2 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xl">Enter Topic</span>
          </button>

        </div>
      </div>
    </div>

    <QuizPDFUploadModal isOpen={showPDFUpload}
    onClose={() => setShowPDFUpload(false)}/>

    <QuizEnterTopicModal isOpen={showTextUpload}
    onClose={() => setShowTextUpload(false)}/>
    </>
  );
};

// Quiz generate for upload pdf
const QuizPDFUploadModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[4vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Modal Header with Close Button */}
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
          {/* Quiz Options */}
          <div> 
            <label className="block text-base mb-2 text-white">Quiz Type</label>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">MCQ's</button>
              <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">Q&A</button>
              <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">T/F</button>
            </div>
          </div>

          {/* Difficulty Level */}
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

          {/* Generate Quiz Button */}
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
  );
};

// Quiz generate for upload pdf
const QuizEnterTopicModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[2vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Modal Header with Close Button */}
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
          {/* Quiz Options */}
          <div> 
            <label className="block text-base mb-2 text-white">Quiz Type</label>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">MCQ's</button>
              <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">Q&A</button>
              <button className="bg-black hover:bg-purple-600 text-purple-200 p-2 rounded-xl transition-colors">T/F</button>
            </div>
          </div>

          {/* Difficulty Level */}
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

          {/* Generate Quiz Button */}
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
  );
};

// summarize notes
const SummarizeModal = ({ isOpen, onClose }) => {
  const [showPDFUpload, setShowPDFUpload] = useState(false);
  const [showTextUpload, setShowTextUpload] = useState(false);

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[18vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              <span className="text-white">Summarize </span>
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

        {/* Modal Content */}
        <div className="p-8 space-y-2">
          {/* Upload PDF Button */}
          <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 transition-colors" onClick={() => setShowPDFUpload(true)}>
            <div className="p-2 rounded-lg">
              <Upload className="w-6 h-6" />
            </div>
            <span className="text-xl">Upload PDF</span>
          </button>

          {/* Upload Text Button */}
          <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 transition-colors" onClick={() => setShowTextUpload(true)}>
            <div className="p-2 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xl">Upload Text</span>
          </button>

        </div>
      </div>
    </div>

    <PDFUploadModal isOpen={showPDFUpload}
    onClose={() => setShowPDFUpload(false)}/>

    <TextUploadModal isOpen={showTextUpload}
    onClose={() => setShowTextUpload(false)}/>
    </>
  );
};
  
// summarize notes for pdf upload
const PDFUploadModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
        {/* Modal Header with Close Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Upload PDF</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="bg-black rounded-xl p-6 flex items-center gap-3 mb-6 cursor-pointer hover:bg-purple-600 transition-colors">
          <Upload className="w-6 h-6 text-purple-200" />
          <span className="text-purple-200 text-lg">Upload PDF file</span>
        </div>

        {/* Summarize Button */}
        <button className="w-full bg-black text-purple-200 p-4 rounded-xl flex items-center gap-3 justify-center mb-4 hover:bg-purple-600 transition-colors">
          <FileText className="w-6 h-6" />
          <span className="text-lg">Summarize your notes</span>
        </button>

        {/* More Options Button */}
        <button 
          onClick={onClose}
          className="w-full bg-black text-purple-200 p-4 rounded-xl flex items-center gap-3 justify-center hover:bg-purple-600 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg">More options</span>
        </button>
      </div>
    </div>
  );
};

// summarize notes text Upload 
const TextUploadModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
     <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
      {/* Modal Header with Close Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-white">Upload Text</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

        {/* Text Input Area */}
        <div className="mb-6">
          <label className="block text-xl mb-2">Text</label>
          <textarea 
            className="w-full h-36 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter or paste your text here..."
          />
        </div>

        {/* Summarize Button */}
        <button className="w-full bg-black text-purple-200 p-4 rounded-xl flex items-center gap-3 justify-center mb-4 hover:bg-purple-600 transition-colors">
          <FileText className="w-6 h-6" />
          <span className="text-lg">Summarize your notes</span>
        </button>

        {/* More Options Button */}
        <button 
          onClick={onClose}
          className="w-full bg-black text-purple-200 p-4 rounded-xl flex items-center gap-3 justify-center hover:bg-purple-600 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg">More options</span>
        </button>
      </div>
    </div>
  );
};

// hear your notes
const HearYourNotesModal = ({ isOpen, onClose }) => {
  const [showPDFUpload, setShowPDFUpload] = useState(false);
  const [showTextUpload, setShowTextUpload] = useState(false);

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Modal Header */}
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

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          {/* Upload PDF Button */}
          <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 transition-colors" onClick={() => setShowPDFUpload(true)}>
            <div className="p-2 rounded-lg">
              <Upload className="w-6 h-6" />
            </div>
            <span className="text-xl">Upload PDF</span>
          </button>

          {/* Upload Text Button */}
          <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 transition-colors" onClick={() => setShowTextUpload(true)}>
            <div className="p-2 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xl">Upload Text</span>
          </button>

        </div>
      </div>
    </div>

    <HearPDFUploadModal isOpen={showPDFUpload} 
    onClose={() => setShowPDFUpload(false)}/>

    <HearTextUploadModal isOpen={showTextUpload}
    onClose={() => setShowTextUpload(false)}/> 
    </>
  );
};

// hear you notes upload file
const HearPDFUploadModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
        {/* Modal Header with Close Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Upload PDF</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="bg-black hover:bg-purple-600 text-purple-200 rounded-xl p-6 flex items-center gap-3 mb-6 cursor-pointer transition-colors">
          <Upload className="w-6 h-6 text-purple-200" />
          <span className="text-purple-200 text-lg">Upload PDF file</span>
        </div>

        {/* Summarize Button */}
        <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 justify-center mb-4 transition-colors">
          <Radio className="w-6 h-6" />
          <span className="text-lg">Hear your notes</span>
        </button>

        {/* More Options Button */}
        <button 
          onClick={onClose}
          className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 justify-center  transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg">More options</span>
        </button>
      </div>
    </div>
  );
};

// hear you notes upload text
const HearTextUploadModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-[10vh]">
     <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden p-6">
      {/* Modal Header with Close Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-white">Upload Text</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-purple-600 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-purple-200" />
        </button>
      </div>

        {/* Text Input Area */}
        <div className="mb-6">
          <label className="block text-xl mb-2">Text</label>
          <textarea 
            className="w-full h-36 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter or paste your text here..."
          />
        </div>

        {/* Summarize Button */}
        <button className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 justify-center mb-4 transition-colors">
          <Radio className="w-6 h-6" />
          <span className="text-lg">Hear your notes</span>
        </button>

        {/* More Options Button */}
        <button 
          onClick={onClose}
          className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg">More options</span>
        </button>
      </div>
    </div>
  );
};

// youtube accuracy checker
const YouTubeAccuracyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-2xl font-semibold text-white">YouTube video</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 pt-2 space-y-6">
          {/* Link Input Section */}
          <div className="space-y-2 mt-6">
            <label className="text-xl text-white">Link</label>
            <input 
              type="text"
              placeholder="youtube.com/watch/128"
              className="w-full p-4 rounded-xl border border-white-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Check Video Accuracy Button */}
          <button className="mt-6 w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors">
            <Youtube className="w-6 h-6" />
            <span className="text-xl">Check Video Accuracy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  
  const [isGenerateNotesOpen, setIsGenerateNotesOpen] = useState(false);
  const [isYouTubeAccuracyOpen, setIsYouTubeAccuracyOpen] = useState(false);
  const [isSummarizeOpen, setIsSummarizeOpen] = useState(false);
  const [isHearYourNotesOpen, setIsHearYourNotesOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const features = [
    { icon: <FileText className="w-6 h-6" />, title: 'Generate Notes', onClick: () => setIsGenerateNotesOpen(true) },
    { icon: <HelpCircle className="w-6 h-6" />, title: 'Generate Quizzes', onClick: () => setIsQuizOpen(true) },
    { icon: <FileText className="w-6 h-6" />, title: 'Summarize', onClick: () => setIsSummarizeOpen(true) },
    { icon: <Radio className="w-6 h-6" />, title: 'Hear your notes', onClick: () => setIsHearYourNotesOpen(true) },
    { icon: <Youtube className="w-6 h-6 text-red-500" />, title: 'Youtube video accuracy', onClick: () => setIsYouTubeAccuracyOpen(true) },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Sider />
      
       {/* Main Content */}
      <div className="lg:ml-64 pt-16">
        <div className="max-w-5xl mx-auto p-4 lg:p-8">
          <h1 className="text-2xl lg:text-3xl font-semibold mb-2 text-white">Features</h1>
          <p className="text-purple-300 mb-6 lg:mb-8">Generate notes, quizzes, summarizations and video accuracy</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 lg:p-6 rounded-xl cursor-pointer flex items-center gap-4 
                border border-purple-900/30 hover:border-purple-500/50 transition-colors
                hover:bg-gray-800/80 group"
                onClick={feature.onClick}
              >
                <div className="p-2 bg-purple-900/30 rounded-lg group-hover:bg-purple-900/50 transition-colors">
                  <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <span className="font-medium text-base lg:text-lg text-gray-200 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <GenerateNotesModal isOpen={isGenerateNotesOpen} onClose={() => setIsGenerateNotesOpen(false)} />
      
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      
      <SummarizeModal isOpen={isSummarizeOpen} onClose={() => setIsSummarizeOpen(false)} />

      <HearYourNotesModal isOpen={isHearYourNotesOpen} onClose={() => setIsHearYourNotesOpen(false)} />
      
      <YouTubeAccuracyModal isOpen={isYouTubeAccuracyOpen} onClose={() => setIsYouTubeAccuracyOpen(false)} />
      
    
    </div>
    
  );
};

export default UserDashboard;

