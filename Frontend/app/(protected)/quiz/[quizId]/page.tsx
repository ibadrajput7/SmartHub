
import { getQuizById } from './actions'
import QuizDisplay from '@/components/QuizDisplay'

export default async function QuizPage({ params }: { params: { quizId: string } }) {
  const quizData = await getQuizById(params.quizId)

  if (!quizData) {
    return <div className="text-center text-white">Quiz not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Generated Quiz</h1>
      <QuizDisplay quiz={quizData} />
    </div>
  )
}