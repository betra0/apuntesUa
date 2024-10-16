
export default class sessionExpiredError extends Error {
    constructor(message) {
      super(message);
      this.name = 'sessionExpiredError';
    }
  }
  
export class ApiError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = "ApiError";
      this.statusCode = statusCode;
    }
  }