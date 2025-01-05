'use client';

import { useState } from 'react';
import { ChevronDown, FileText, Youtube, Headphones, Brain, MessageSquare, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
}

export default function How() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const steps: Step[] = [
    {
      id: 1,
      title: "Dashboard Overview",
      description: "Access all key features of Smarthub from your dashboard",
      icon: BarChart,
      details: [
        "Generate Notes",
        "Summarize Notes",
        "Create Quizzes",
        "Hear Your Notes",
        "YouTube Video Accuracy",
        "Chatbot Assistance"
      ]
    },
    {
      id: 2,
      title: "Generate Notes",
      description: "Create notes from various sources",
      icon: FileText,
      details: [
        "Go to the Generate Notes section",
        "Select your source: Recorded Audio, Upload File, YouTube Link, Topic name",
        "Upload your file or paste the YouTube link",
        "Click Generate for AI-powered note creation"
      ]
    },
    {
      id: 3,
      title: "Summarize Your Notes",
      description: "Get concise summaries of your content",
      icon: Brain,
      details: [
        "Navigate to the Summarize Notes section",
        "Choose your preferred source",
        "Provide the content, Upload the file or Paste YouTube link",
        "Click Summarize for an AI-generated summary"
      ]
    },
    {
      id: 4,
      title: "Create Quizzes",
      description: "Test your knowledge with AI-generated quizzes",
      icon: Brain,
      details: [
        "Access the Generate Quizzes section",
        "Select your content source",
        "Provide the content, Upload the file or Paste YouTube link",
        "Get auto-generated quizzes with various question types"
      ]
    },
    {
      id: 5,
      title: "Hear Your Notes",
      description: "Convert your notes to audio format",
      icon: Headphones,
      details: [
        "Visit the Hear Your Notes section",
        "Upload notes",
        "Click Listen to hear your notes",
        "Enjoy audio versions of your content"
      ]
    },
    {
      id: 6,
      title: "YouTube Video Accuracy",
      description: "Check video relevance to your topics",
      icon: Youtube,
      details: [
        "Go to YouTube Video Accuracy section",
        "Paste your YouTube link",
        "Get AI analysis of video relevance",
        "Make informed decisions about content"
      ]
    },
    {
      id: 7,
      title: "Chatbot Assistance",
      description: "Get real-time support and guidance",
      icon: MessageSquare,
      details: [
        "Click the support button (top right)",
        "Ask questions about using Smarthub",
        "Receive instant helpful responses",
        "Get guided assistance for any feature"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="">
        <div className="max-w-5xl mx-auto p-4 lg:p-2">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                How to Use Smart Hub
              </h1>
              <p className="text-lg text-purple-300">
                Follow these simple steps to make the most of Smarthub's AI-powered learning features
              </p>
            </div>

            <div className="grid gap-6">
              {steps.map((step) => (
                <Card 
                  key={step.id}
                  className="border-gray-800 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-colors"
                >
                  <CardHeader>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-between p-0 hover:bg-transparent"
                      onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                          <step.icon className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="text-left">
                          <CardTitle className="text-white">{step.title}</CardTitle>
                          <CardDescription className="text-gray-400">{step.description}</CardDescription>
                        </div>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedStep === step.id ? 'transform rotate-180' : ''
                        }`}
                      />
                    </Button>
                  </CardHeader>
                  <AnimatePresence>
                    {expandedStep === step.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CardContent>
                          <ul className="space-y-3 text-gray-300">
                            {step.details.map((detail, index) => (
                              <motion.li
                                key={index}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                {detail}
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

