'use client';

import { useState } from 'react';
import { Youtube, Headphones, ArrowRight, Star } from 'lucide-react';

export default function Updates() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const features = [
    {
      id: 'youtube',
      title: 'YouTube Video Accuracy',
      description: 'Elevate your learning upcoming YouTube Video Accuracy feature. Simply provide a YouTube link, and we will analyze the video relevance to your topic, ensuring it aligns with your study needs.',
      icon: Youtube,
      color: 'from-purple-500 to-black-500',
    },
    {
      id: 'audio',
      title: 'Hear Your Notes',
      description: 'Transform your notes into audio! Soon you will be able to listen to your notes with natural-sounding voice synthesis, perfect for learning on the go.',
      icon: Headphones,
      color: 'from-purple-500 to-black-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="">
        <div className="max-w-5xl mx-auto p-4 lg:p-2">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Future Updates
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out"
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-75 transition-opacity duration-300 ${hoveredCard === feature.id ? 'opacity-100' : 'opacity-75'}`} />
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold ml-4 text-white">{feature.title}</h2>
                  </div>
                  <p className="text-gray-100 mb-4 flex-grow">{feature.description}</p>
                  <div className="flex items-center text-white mt-4">
                    <Star className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Coming Soon</span>
                    <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${hoveredCard === feature.id ? 'translate-x-2' : ''}`} />
                  </div>
                </div>
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity duration-300 ${hoveredCard === feature.id ? 'opacity-50' : ''}`}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-gray-300">Stay tuned for more exciting features!</p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

