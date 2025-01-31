'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Quiz {
  id: number;
  title: string;
  questions: any[];
  user_id: number;
}

function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Link href={`/quiz/${quiz.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-xl border-2 border-purple-700/20 bg-[#1A1F2B]/90 p-6 backdrop-blur-sm hover:border-purple-600/30 transition-all duration-200 cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent opacity-50"></div>
        <div className="relative">
          <h3 className="text-lg font-semibold text-white mb-2">{quiz.title}</h3>
          <p className="text-sm text-gray-400">
            {quiz.questions ? quiz.questions.length : 0} Questions
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Analytics() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getAccessToken = () => {
      // Parse cookies manually since we're on client side
      const cookie = document.cookie
        .split(';')
        .find(c => c.trim().startsWith('access_token='));
      if (!cookie) return null;
      return cookie.split('=')[1];
    };

    const fetchQuizzes = async () => {
      try {
        const token = getAccessToken();
        
        if (!token) {
          // If no token found, try to wait briefly in case it's still being set
          await new Promise(resolve => setTimeout(resolve, 1000));
          const retryToken = getAccessToken();
          if (!retryToken) {
            console.log('No access token found, redirecting to login');
            router.push('/login');
            return;
          }
        }

        const response = await fetch('http://127.0.0.1:5000/api/user/quizzes', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });

        if (response.status === 401) {
          console.log('Unauthorized, redirecting to login');
          router.push('/login');
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to fetch quizzes');
        }

        const data = await response.json();
        console.log('Fetched quiz data:', data);

        if (Array.isArray(data)) {
          setQuizzes(data);
          setError(null);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err: any) {
        console.error('Error details:', err);
        setError(err.message || 'Error loading quizzes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto p-4 lg:p-8">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-6 text-white text-center">
          Generated Quizzes
        </h1>

        <div className="flex justify-center w-full">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 p-4 rounded-lg bg-red-900/20 w-full">
              {error}
            </div>
          ) : quizzes.length === 0 ? (
            <div className="text-center text-gray-400 p-8 w-full">
              No quizzes generated yet. Start by analyzing some content!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full place-items-center">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}