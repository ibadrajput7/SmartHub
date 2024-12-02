// UserDashboard.tsx
'use client';

import { useState } from 'react';
import { FileText, HelpCircle, Radio, Youtube } from 'lucide-react';
import GenerateNotesModal from '@/components/modals/GenerateNotesModal';
import QuizModal from '@/components/modals/QuizModal';
import SummarizeModal from '@/components/modals/SummarizeModal';
import HearYourNotesModal from '@/components/modals/HearYourNotesModal';
import YouTubeAccuracyModal from '@/components/modals/YouTubeAccuracyModal';

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
    {/* //   <Sider /> */}
      
      {/* Main Content */}
      <div className="">
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
}

export default UserDashboard;