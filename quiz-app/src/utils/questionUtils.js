// src/utils/questionUtils.js

/**
 * Decode HTML entities from API responses
 */
export const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

/**
 * Shuffle array elements (Fisher-Yates algorithm)
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Process raw questions from API into usable format
 */
export const processQuestions = (rawQuestions) => {
  return rawQuestions.map((q, index) => {
    // Decode all text fields
    const question = decodeHtml(q.question);
    const correctAnswer = decodeHtml(q.correct_answer);
    const incorrectAnswers = q.incorrect_answers.map(a => decodeHtml(a));
    
    // Combine and shuffle all answers
    const allAnswers = shuffleArray([correctAnswer, ...incorrectAnswers]);

    return {
      id: index,
      question,
      correctAnswer,
      incorrectAnswers,
      allAnswers,
      category: decodeHtml(q.category),
      difficulty: q.difficulty,
      type: q.type,
      // Add a unique key for React lists
      key: `q_${index}_${Date.now()}`
    };
  });
};

/**
 * Validate question data
 */
export const validateQuestions = (questions) => {
  if (!Array.isArray(questions) || questions.length === 0) {
    return { valid: false, error: 'No questions available' };
  }

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (!q.question || !q.correctAnswer || !q.incorrectAnswers || q.incorrectAnswers.length !== 3) {
      return { 
        valid: false, 
        error: `Invalid question format at index ${i}` 
      };
    }
  }

  return { valid: true, error: null };
};

/**
 * Format time from seconds to MM:SS
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

/**
 * Calculate score percentage
 */
export const calculateScorePercentage = (score, total) => {
  return total > 0 ? Math.round((score / total) * 100) : 0;
};