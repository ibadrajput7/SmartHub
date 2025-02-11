'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, ChevronLeft, Download } from 'lucide-react'

interface AudioPlayerProps {
  audioUrl: string;
  headers?: HeadersInit;
  onBack?: () => void;
}

const AudioPlayer = ({ audioUrl, headers, onBack }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      setIsLoading(false);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'smarthub-audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-900/20 to-black/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-500/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-purple-100">
            Audio Player
          </h3>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-purple-600/80 hover:bg-purple-700 transition-all duration-300 rounded-lg flex items-center gap-2 group"
            title="Download audio"
          >
            <Download className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            <span className="text-white text-sm font-medium">Download</span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center shadow-xl hover:shadow-purple-500/20 transition-shadow duration-300">
            <button
              onClick={togglePlayPause}
              disabled={isLoading}
              className="w-full h-full rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white" />
              ) : (
                <Play className="w-10 h-10 text-white ml-2" />
              )}
            </button>
          </div>
          
          <div className="w-full max-w-md h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-0 animate-pulse rounded-full" />
          </div>
          
          <audio 
            ref={audioRef}
            onEnded={() => setIsPlaying(false)}
            controls={false}
          />
        </div>
      </div>

      <button 
        onClick={onBack}
        className="w-full bg-black/50 hover:bg-purple-600/80 text-purple-200 p-4 rounded-xl flex items-center gap-3 justify-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
      >
        <ChevronLeft className="w-6 h-6" />
        <span className="text-lg font-medium">Back to upload</span>
      </button>

      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500" />
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;