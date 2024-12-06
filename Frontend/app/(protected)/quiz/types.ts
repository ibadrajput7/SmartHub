export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface QuizData {
  id: number;
  title: string;
  questions: QuizQuestion[];  // Now we expect an array of questions
  user_id: number;
}