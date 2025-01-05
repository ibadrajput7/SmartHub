'use client';

import { Brain, Users, BookOpen, Sparkles, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="">
        <div className="max-w-5xl mx-auto p-4 lg:p-2">
          {/* Hero Section */}
          <div className=" mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
              About Us
            </h1>
            <p className="text-lg text-purple-300">
              Empowering students with AI-driven learning solutions
            </p>
          </div>
          

          {/* Main Content */}
          <div className="space-y-8 text-gray-300">
            {/* Introduction */}
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-purple-500/10">
              <div className="flex items-center gap-4 mb-4">
                <Brain className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-semibold text-white">Our Vision</h2>
              </div>
              <p className="leading-relaxed">
                Smarthub is an innovative platform designed to enhance student productivity by harnessing the power of AI. 
                We aim to revolutionize the learning process with intelligent tools that simplify note-taking, study preparation, 
                and knowledge retention.
              </p>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-purple-500/10">
                <div className="flex items-center gap-4 mb-4">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Smart Note Generation</h3>
                </div>
                <p className="text-gray-300">
                  Our platform provides a seamless experience for students who want to generate accurate, 
                  AI-based notes from various sources, including live recordings, YouTube videos, and text.
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-purple-500/10">
                <div className="flex items-center gap-4 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Personalized Learning</h3>
                </div>
                <p className="text-gray-300">
                  Create customized quizzes based on your notes, with varying difficulty levels and 
                  question types, including multiple-choice, true/false, and short-answer formats.
                </p>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-purple-900/20 to-gray-800/20 rounded-xl p-8 backdrop-blur-sm border border-purple-500/10">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
              </div>
              <p className="leading-relaxed">
                At Smarthub, we are driven by a single mission: to make learning more efficient and accessible. 
                We understand the challenges students face when managing study materials, and we are committed 
                to providing AI-powered solutions that streamline the entire process.
              </p>
            </div>

            {/* Team Vision */}
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-purple-500/10">
              <div className="flex items-center gap-4 mb-4">
                <Users className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-semibold text-white">Join Our Journey</h2>
              </div>
              <p className="leading-relaxed mb-4">
                We believe that education should be more than just memorization—it should be an experience 
                that fosters understanding, creativity, and critical thinking.
              </p>
              <p className="leading-relaxed text-purple-300">
                Join us at Smarthub.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

