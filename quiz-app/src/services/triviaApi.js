const BASE_URL = 'https://opentdb.com/api.php';

export const CATEGORIES = [
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Entertainment: Books' },
  { id: 11, name: 'Entertainment: Film' },
  { id: 12, name: 'Entertainment: Music' },
  { id: 17, name: 'Science & Nature' },
  { id: 18, name: 'Science: Computers' },
  { id: 19, name: 'Science: Mathematics' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' },
  { id: 27, name: 'Animals' }
];

export const DIFFICULTIES = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' }
];

class TriviaAPI {
  constructor() {
    this.lastRequestTime = 0;
    this.minRequestInterval = 5000; 
    this.pendingRequest = null; 
  }

  async fetchQuestions({ amount = 10, category = 9, difficulty = 'easy' } = {}) {
    if (this.pendingRequest) {
      try {
        return await this.pendingRequest;
      } catch (error) {
        this.pendingRequest = null;
      }
    }

    this.pendingRequest = this._makeRequest({ amount, category, difficulty });
    
    try {
      const result = await this.pendingRequest;
      return result;
    } finally {
      this.pendingRequest = null;
    }
  }

  async _makeRequest({ amount, category, difficulty }) {
    try {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;
      
      if (timeSinceLastRequest < this.minRequestInterval) {
        const waitTime = this.minRequestInterval - timeSinceLastRequest;
        console.log(`Rate limiting: waiting ${waitTime}ms`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }

      const url = `${BASE_URL}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
      
      console.log('Fetching from:', url);

      const response = await fetch(url);
      this.lastRequestTime = Date.now();

      if (!response.ok) {
        if (response.status === 429) {
          console.log('Rate limited, waiting 6 seconds...');
          await new Promise(resolve => setTimeout(resolve, 6000));
          const retryResponse = await fetch(url);
          this.lastRequestTime = Date.now();
          
          if (!retryResponse.ok) {
            throw new Error(`HTTP error! status: ${retryResponse.status}`);
          }
          
          const retryData = await retryResponse.json();
          return this._handleResponse(retryData);
        }
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this._handleResponse(data);

    } catch (error) {
      console.error('API Error Details:', error);
      return {
        success: false,
        error: error.message,
        questions: []
      };
    }
  }

  _handleResponse(data) {
    if (data.response_code !== 0) {
      return this._handleResponseCode(data.response_code);
    }

    return {
      success: true,
      questions: data.results,
      responseCode: data.response_code
    };
  }

  _handleResponseCode(code) {
    const messages = {
      0: 'Success',
      1: 'No Results - Try different settings',
      2: 'Invalid Parameter',
      3: 'Token Not Found',
      4: 'Token Empty'
    };

    return {
      success: false,
      error: messages[code] || 'Unknown error occurred',
      questions: []
    };
  }
}

export const triviaAPI = new TriviaAPI();