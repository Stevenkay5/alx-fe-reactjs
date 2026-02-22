// src/services/triviaApi.js
const BASE_URL = 'https://opentdb.com/api.php';
const SESSION_TOKEN_URL = 'https://opentdb.com/api_token.php';

// Category IDs from Open Trivia Database
export const CATEGORIES = [
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Entertainment: Books' },
  { id: 11, name: 'Entertainment: Film' },
  { id: 12, name: 'Entertainment: Music' },
  { id: 13, name: 'Entertainment: Musicals & Theatres' },
  { id: 14, name: 'Entertainment: Television' },
  { id: 15, name: 'Entertainment: Video Games' },
  { id: 16, name: 'Entertainment: Board Games' },
  { id: 17, name: 'Science & Nature' },
  { id: 18, name: 'Science: Computers' },
  { id: 19, name: 'Science: Mathematics' },
  { id: 20, name: 'Mythology' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' },
  { id: 24, name: 'Politics' },
  { id: 25, name: 'Art' },
  { id: 26, name: 'Celebrities' },
  { id: 27, name: 'Animals' },
  { id: 28, name: 'Vehicles' },
  { id: 29, name: 'Entertainment: Comics' },
  { id: 30, name: 'Science: Gadgets' },
  { id: 31, name: 'Entertainment: Japanese Anime & Manga' },
  { id: 32, name: 'Entertainment: Cartoon & Animations' }
];

export const DIFFICULTIES = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' }
];

// Response codes and their meanings
const RESPONSE_CODES = {
  0: 'Success',
  1: 'No Results - Could not return enough results',
  2: 'Invalid Parameter - Category/difficulty not found',
  3: 'Token Not Found - Session token does not exist',
  4: 'Token Empty - Session token has returned all possible questions'
};

class TriviaAPI {
  constructor() {
    this.sessionToken = null;
    this.lastRequestTime = 0;
    this.minRequestInterval = 5000; // 5 seconds rate limit
  }

  // Generate or retrieve session token to avoid duplicate questions
  async getSessionToken() {
    try {
      const response = await fetch(`${SESSION_TOKEN_URL}?command=request`);
      const data = await response.json();
      
      if (data.response_code === 0) {
        this.sessionToken = data.token;
        return this.sessionToken;
      }
      throw new Error('Failed to get session token');
    } catch (error) {
      console.error('Session token error:', error);
      return null;
    }
  }

  // Reset session token when questions run out
  async resetSessionToken() {
    if (!this.sessionToken) return;
    
    try {
      await fetch(`${SESSION_TOKEN_URL}?command=reset&token=${this.sessionToken}`);
    } catch (error) {
      console.error('Failed to reset token:', error);
    }
  }

  // Enforce rate limiting
  async waitForRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  // Main method to fetch questions
  async fetchQuestions({
    amount = 10,
    category = 9,
    difficulty = 'easy',
    useSessionToken = true
  } = {}) {
    try {
      // Rate limiting
      await this.waitForRateLimit();
      
      // Build URL with parameters
      let url = `${BASE_URL}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
      
      // Add session token if available
      if (useSessionToken) {
        if (!this.sessionToken) {
          await this.getSessionToken();
        }
        if (this.sessionToken) {
          url += `&token=${this.sessionToken}`;
        }
      }

      // Make the request
      const response = await fetch(url);
      this.lastRequestTime = Date.now();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Handle response codes
      if (data.response_code !== 0) {
        return this.handleResponseCode(data.response_code);
      }

      // Process and return questions
      return {
        success: true,
        questions: data.results,
        responseCode: data.response_code
      };

    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error.message,
        questions: []
      };
    }
  }

  handleResponseCode(code) {
    const message = RESPONSE_CODES[code] || 'Unknown error';
    
    switch(code) {
      case 1:
        return {
          success: false,
          error: 'Not enough questions available. Try different criteria.',
          questions: []
        };
      case 2:
        return {
          success: false,
          error: 'Invalid category or difficulty selected.',
          questions: []
        };
      case 3:
      case 4:
        // Reset token for these errors
        this.sessionToken = null;
        return {
          success: false,
          error: 'Question pool exhausted. Please try again.',
          questions: []
        };
      default:
        return {
          success: false,
          error: message,
          questions: []
        };
    }
  }

  // Get available question count (approximate)
  async getQuestionCount(category) {
    try {
      const response = await fetch(`https://opentdb.com/api_count.php?category=${category}`);
      const data = await response.json();
      return data.category_question_count;
    } catch (error) {
      console.error('Failed to get question count:', error);
      return null;
    }
  }
}

// Create and export a singleton instance
export const triviaAPI = new TriviaAPI();