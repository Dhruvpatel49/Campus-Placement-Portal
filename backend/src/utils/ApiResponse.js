import { HTTP_STATUS } from './constants.js';

class ApiResponse {
  constructor(statusCode = HTTP_STATUS.OK, data = null, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
