'use client'

import { useState } from 'react'
import { X, Upload } from 'lucide-react'
import { toast } from 'sonner'
import { fileToAudio } from '@/app/(protected)/dashboard/actions'
import AudioPlayer from '../AudioPlayer'

const HearYourNotesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [audioConfig, setAudioConfig] = useState<{url: string, headers: HeadersInit} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'txt'].includes(fileType || '')) {
      toast.error('Only PDF and TXT files are supported');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      setIsLoading(true);
      setError(null);
      const config = await fileToAudio(formData);
      setAudioConfig(config);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to process audio');
      toast.error(error instanceof Error ? error.message : 'Failed to process audio');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-start justify-center pt-[10vh]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">
              Hear your notes
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
          {error && (
            <div className="text-red-500 text-center p-4">
              {error}
            </div>
          )}
          
          {!audioConfig ? (
            <label className="w-full bg-black hover:bg-purple-600 text-purple-200 p-4 rounded-xl flex items-center gap-3 transition-colors cursor-pointer">
              <div className="p-2 rounded-lg">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xl">Upload File</span>
              <input 
                type="file" 
                accept=".pdf,.txt"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isLoading}
              />
            </label>
          ) : (
            <AudioPlayer 
              audioUrl={audioConfig.url} 
              headers={audioConfig.headers}
              onBack={() => {
                setAudioConfig(null);
                setError(null);
              }}
            />
          )}
          
          {isLoading && (
            <div className="text-center text-purple-300">
              Processing your file...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HearYourNotesModal;