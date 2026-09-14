import { config } from '../config/env.js';

const isProduction = config.nodeEnv === 'production';

/**
 * Base cookie configuration
 */
export const getCookieOptions = (maxAgeMs) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: maxAgeMs,
  path: '/',
});

/**
 * 15 minutes max age for access token cookie
 */
export const ACCESS_TOKEN_COOKIE_OPTIONS = getCookieOptions(15 * 60 * 1000);

/**
 * 7 days max age for refresh token cookie
 */
export const REFRESH_TOKEN_COOKIE_OPTIONS = getCookieOptions(7 * 24 * 60 * 60 * 1000);

/**
 * Clear cookie options
 */
export const CLEAR_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  path: '/',
};

/**
 * Helper to attach authentication cookies to express response
 * @param {Response} res 
 * @param {string} accessToken 
 * @param {string} refreshToken 
 */
export const setAuthCookies = (res, accessToken, refreshToken) => {
  if (accessToken) {
    res.cookie('accessToken', accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
  }
  if (refreshToken) {
    res.cookie('refreshToken', refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
  }
};

/**
 * Helper to clear authentication cookies from express response
 * @param {Response} res 
 */
export const clearAuthCookies = (res) => {
  res.clearCookie('accessToken', CLEAR_COOKIE_OPTIONS);
  res.clearCookie('refreshToken', CLEAR_COOKIE_OPTIONS);
};
