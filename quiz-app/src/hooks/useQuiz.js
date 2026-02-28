import { useState, useCallback } from 'react';
import { triviaAPI } from '../services/triviaApi';

const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const processQuestions = (rawQuestions) => {
  return rawQuestions.map((q, index) => {
    const question = decodeHtml(q.question);
    const correctAnswer = decodeHtml(q.correct_answer);
    const incorrectAnswers = q.incorrect_answers.map(a => decodeHtml(a));
    const allAnswers = shuffleArray([correctAnswer, ...incorrectAnswers]);

    return {
      id: index,
      question,
      correctAnswer,
      allAnswers,
      category: decodeHtml(q.category),
      difficulty: q.difficulty
    };
  });
};

export const useQuiz = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processedQuestions, setProcessedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState('setup');

  const loadQuestions = useCallback(async (config) => {
    console.log('loadQuestions called with config:', config);
    console.log('current loading state:', loading);
    
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching questions from API...');
      const result = await triviaAPI.fetchQuestions(config);
      console.log('API result:', result);

      if (!result.success) {
        console.log('API returned error:', result.error);
        setError(result.error || 'Failed to load questions');
        return false;
      }

      if (!result.questions || result.questions.length === 0) {
        console.log('No questions received');
        setError('No questions received from API');
        return false;
      }

      console.log('Processing questions:', result.questions.length);
      const processed = processQuestions(result.questions);
      
      setProcessedQuestions(processed);
      setQuizState('active');
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setScore(0);
      console.log('State updated, quiz should show now');
      
      return true;
      
    } catch (err) {
      console.log('Caught error:', err);
      setError(err.message || 'Failed to load questions');
      return false;
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  }, []);

  const handleAnswer = useCallback((answer) => {
    if (quizState !== 'active' || !processedQuestions[currentQuestionIndex]) return;
    
    const currentQuestion = processedQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const answerRecord = {
      question: currentQuestion.question,
      selectedAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect
    };
    
    setUserAnswers(prev => [...prev, answerRecord]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    if (currentQuestionIndex + 1 < processedQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizState('completed');
    }
  }, [currentQuestionIndex, processedQuestions, quizState]);

  const resetQuiz = useCallback(() => {
    setProcessedQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setQuizState('setup');
    setError(null);
  }, []);

  const currentQuestion = processedQuestions[currentQuestionIndex] || null;

  const progress = {
    current: currentQuestionIndex + 1,
    total: processedQuestions.length,
    percentage: processedQuestions.length > 0 
      ? ((currentQuestionIndex + 1) / processedQuestions.length) * 100 
      : 0
  };

  return {
    loading,
    error,
    currentQuestion,
    progress,
    quizState,
    score,
    userAnswers,
    totalQuestions: processedQuestions.length,
    loadQuestions,
    handleAnswer,
    resetQuiz
  };
};