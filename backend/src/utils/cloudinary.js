import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/env.js';
import { logger } from './logger.js';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

/**
 * Upload buffer to Cloudinary
 * @param {Buffer} fileBuffer 
 * @param {string} folder 
 * @param {string} resourceType ('raw', 'auto', 'image')
 * @returns {Promise<Object>} Cloudinary upload result object
 */
export const uploadToCloudinary = (fileBuffer, folder = 'resumes', resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    // If Cloudinary is not configured in env, fallback to mock result in development
    if (!config.cloudinary.cloudName || !config.cloudinary.apiKey) {
      logger.warn('[CLOUDINARY] Cloudinary credentials missing. Returning simulated upload object.');
      return resolve({
        secure_url: `https://res.cloudinary.com/demo/raw/upload/v1234567890/mock_${Date.now()}.pdf`,
        public_id: `mock_${Date.now()}`,
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          logger.error(`Cloudinary Upload Error: ${error.message}`);
          return reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Delete asset from Cloudinary by public ID
 * @param {string} publicId 
 * @param {string} resourceType 
 */
export const deleteFromCloudinary = async (publicId, resourceType = 'auto') => {
  if (!publicId || publicId.startsWith('mock_')) return;
  if (!config.cloudinary.cloudName) return;

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    logger.error(`Cloudinary Delete Error: ${error.message}`);
  }
};
