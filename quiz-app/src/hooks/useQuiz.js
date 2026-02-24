import { useState, useCallback } from 'react';
import { triviaAPI } from '../services/triviaApi';

const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
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
      incorrectAnswers,
      allAnswers,
      category: decodeHtml(q.category),
      difficulty: q.difficulty
    };
  });
};

export const useQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processedQuestions, setProcessedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState('setup');

  const loadQuestions = async (config) => {
    if (loading) return false;

    setLoading(true);
    setError(null);
    
    try {
      console.log('Loading questions with config:', config);
      
      const result = await triviaAPI.fetchQuestions(config);
      console.log('API Result:', result);
      
      if (!result.success) {
        setError(result.error || 'Failed to load questions');
        return false;
      }

      if (!result.questions || result.questions.length === 0) {
        setError('No questions received from API');
        return false;
      }

      const processed = processQuestions(result.questions);
      console.log('Processed questions:', processed);
      
      setProcessedQuestions(processed);
      setQuizState('active');
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setScore(0);
      return true;
      
    } catch (err) {
      console.error('Load questions error:', err);
      setError(err.message || 'Failed to load questions');
      return false;
    } finally {
      setLoading(false);
    }
  };

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
    handleAnswer,
    loadQuestions,
    resetQuiz
  };
};