// src/hooks/useQuiz.js
import { useState, useCallback, useEffect } from 'react';
import { triviaAPI } from '../services/triviaApi';
import { processQuestions, validateQuestions } from '../utils/questionUtils';

export const useQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [processedQuestions, setProcessedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState('setup'); // setup, active, completed
  const [quizConfig, setQuizConfig] = useState({
    amount: 10,
    category: 9,
    difficulty: 'easy'
  });

  // Load questions from API
  const loadQuestions = async (config = quizConfig) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await triviaAPI.fetchQuestions(config);
      
      if (!result.success) {
        setError(result.error);
        setQuestions([]);
        setProcessedQuestions([]);
        return false;
      }

      // Validate raw questions
      const validation = validateQuestions(result.questions);
      if (!validation.valid) {
        setError(validation.error);
        return false;
      }

      // Process questions for use in components
      const processed = processQuestions(result.questions);
      
      setQuestions(result.questions);
      setProcessedQuestions(processed);
      setQuizState('active');
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setScore(0);
      
      return true;
    } catch (err) {
      setError(err.message || 'Failed to load questions');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle answer selection
  const handleAnswer = useCallback((answer) => {
    if (quizState !== 'active') return;
    
    const currentQuestion = processedQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    // Record answer
    const answerRecord = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      timestamp: Date.now()
    };
    
    setUserAnswers(prev => [...prev, answerRecord]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question or complete quiz
    if (currentQuestionIndex + 1 < processedQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizState('completed');
    }
  }, [currentQuestionIndex, processedQuestions, quizState]);

  // Restart quiz with same config
  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setQuizState('active');
  }, []);

  // Start new quiz with different config
  const startNewQuiz = useCallback((newConfig) => {
    setQuizConfig(newConfig);
    loadQuestions(newConfig);
  }, []);

  // Reset everything
  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setProcessedQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setQuizState('setup');
    setError(null);
  }, []);

  // Get current question
  const currentQuestion = processedQuestions[currentQuestionIndex] || null;

  // Calculate progress
  const progress = {
    current: currentQuestionIndex + 1,
    total: processedQuestions.length,
    percentage: processedQuestions.length > 0 
      ? ((currentQuestionIndex + 1) / processedQuestions.length) * 100 
      : 0
  };

  return {
    // State
    loading,
    error,
    questions,
    processedQuestions,
    currentQuestion,
    currentQuestionIndex,
    userAnswers,
    score,
    quizState,
    quizConfig,
    progress,
    
    // Actions
    loadQuestions,
    handleAnswer,
    restartQuiz,
    startNewQuiz,
    resetQuiz,
    
    // Utilities
    totalQuestions: processedQuestions.length,
    hasQuestions: processedQuestions.length > 0,
    isLastQuestion: currentQuestionIndex + 1 === processedQuestions.length
  };
};