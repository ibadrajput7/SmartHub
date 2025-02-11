'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
  user_id: number;
}

export default function QuizDetails({ params }: { params: { id: string } }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const token = document.cookie
          .split(';')
          .find(c => c.trim().startsWith('access_token='))
          ?.split('=')[1];

        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`http://127.0.0.1:5000/api/quiz/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          credentials: 'include'
        });

        if (response.status === 401) {
          router.push('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch quiz details');
        }

        const data = await response.json();
        setQuiz(data);
        setError(null);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message || 'Error loading quiz details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizDetails();
  }, [params.id, router]);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="lg:ml-64 pt-16">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <div className="mb-6">
            <Link href="/analytics" className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-400">
              <ArrowLeft size={20} />
              <span>Back to Quizzes</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 p-4 rounded-lg bg-red-900/20">
              {error}
            </div>
          ) : quiz ? (
            <div className="space-y-6">
              <h1 className="text-2xl lg:text-3xl font-semibold text-white mb-8">
                {quiz.title}
              </h1>
              
              <div className="space-y-6">
                {quiz.questions.map((question, index) => (
                  <div key={index} className="p-6 rounded-xl bg-[#1A1F2B]/90 border-2 border-purple-700/20">
                    <h3 className="text-lg font-medium text-white mb-4">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="p-3 rounded-lg border border-purple-700/30 bg-purple-900/20 text-gray-300 hover:bg-purple-800/30 transition-colors cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">Quiz not found</div>
          )}
        </div>
      </div>
    </div>
  );
}