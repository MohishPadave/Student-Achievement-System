// Simple start script for Railway deployment
console.log('Starting Student Achievement Portal Backend...');
console.log('Node.js version:', process.version);
console.log('Environment:', process.env.NODE_ENV || 'development');

// Import and start the main application
import('./app.js').then(() => {
  console.log('Application started successfully!');
}).catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});