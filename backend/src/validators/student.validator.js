import { ApiError } from '../utils/ApiError.js';

export const validateStudentProfileUpdate = (req, res, next) => {
  const { cgpa, backlogs, batch, currentSemester, linkedin, github, leetcode, codeforces, codechef, portfolio } = req.body;
  const errors = [];

  if (cgpa !== undefined && (typeof cgpa !== 'number' || cgpa < 0 || cgpa > 10)) {
    errors.push('CGPA must be a number between 0 and 10');
  }

  if (backlogs !== undefined && (typeof backlogs !== 'number' || backlogs < 0)) {
    errors.push('Backlogs count cannot be negative');
  }

  if (batch !== undefined && (typeof batch !== 'number' || batch < 2000 || batch > 2100)) {
    errors.push('Please enter a valid graduation batch year');
  }

  if (currentSemester !== undefined && (typeof currentSemester !== 'number' || currentSemester < 1 || currentSemester > 10)) {
    errors.push('Semester must be between 1 and 10');
  }

  const urlRegex = /^(https?:\/\/)?([\w.-]+)+[\w\-_~:/?#[\]@!$&'()*+,;=.]+$/;
  const validateUrl = (url, name) => {
    if (url && typeof url === 'string' && url.trim() !== '' && !urlRegex.test(url.trim())) {
      errors.push(`Invalid URL format for ${name}`);
    }
  };

  validateUrl(linkedin, 'LinkedIn');
  validateUrl(github, 'GitHub');
  validateUrl(leetcode, 'LeetCode');
  validateUrl(codeforces, 'Codeforces');
  validateUrl(codechef, 'CodeChef');
  validateUrl(portfolio, 'Portfolio');

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validation failed', errors));
  }

  next();
};
