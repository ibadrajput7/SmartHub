'use client'

import { useState } from 'react'
import { QuizData } from '@/app/(protected)/quiz/types'

interface QuizDisplayProps {
  quiz: QuizData
}

const QuizDisplay = ({ quiz }: QuizDisplayProps) => {
  // Add validation to ensure quiz has questions
  if (!quiz.questions || !quiz.questions.length) {
    return (
      <div className="bg-gray-800 rounded-xl p-6">
        <p className="text-white text-center">No questions available for this quiz.</p>
      </div>
    )
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = quiz.questions[currentQuestionIndex]

  const handleAnswerSelect = (option: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = option
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach((question, index) => {
      if (question.answer === selectedAnswers[index]) {
        correct++
      }
    })
    return `${correct}/${quiz.questions.length}`
  }

  if (showResults) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">Quiz Results</h2>
        <p className="text-xl text-purple-300">Score: {calculateScore()}</p>
        <div className="space-y-4">
          {quiz.questions.map((question, index) => (
            <div key={index} className="p-4 bg-gray-900 rounded-lg">
              <p className="text-white mb-2">{question.question}</p>
              <p className="text-green-500">Correct Answer: {question.answer}</p>
              <p className={`${selectedAnswers[index] === question.answer ? 'text-green-500' : 'text-red-500'}`}>
                Your Answer: {selectedAnswers[index]}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setShowResults(false)
            setCurrentQuestionIndex(0)
            setSelectedAnswers([])
          }}
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
        >
          Retry Quiz
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Question {currentQuestionIndex + 1}</h2>
        <p className="text-purple-300">{currentQuestionIndex + 1}/{quiz.questions.length}</p>
      </div>
      
      <p className="text-xl text-white">{currentQuestion.question}</p>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full p-4 text-left rounded-lg transition-colors ${
              selectedAnswers[currentQuestionIndex] === option
                ? 'bg-purple-600 text-white'
                : 'bg-gray-900 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selectedAnswers[currentQuestionIndex]}
        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {currentQuestionIndex === quiz.questions.length - 1 ? 'Show Results' : 'Next Question'}
      </button>
    </div>
  )
}

export default QuizDisplay