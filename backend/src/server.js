import app from './app.js';
import { config, validateEnv } from './config/env.js';
import { connectDB } from './config/database.js';
import { logger } from './utils/logger.js';

// Validate Environment Variables
validateEnv();

let server;

const startServer = async () => {
  try {
    server = app.listen(config.port, () => {
      logger.info(`Server running in [${config.nodeEnv}] mode on port http://localhost:${config.port}`);
      logger.info(`Health check available at http://localhost:${config.port}/api/v1/health`);
    });

    // Connect to Database
    connectDB().catch((err) => {
      logger.warn(`Initial MongoDB connection failed: ${err.message}. Server running without active DB connection.`);
    });
  } catch (err) {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
};

const handleShutdown = (signal) => {
  logger.info(`${signal} signal received: closing HTTP server.`);
  if (server) {
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Promise Rejection: ${err.message}`);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

startServer();
