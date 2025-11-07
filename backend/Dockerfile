# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (using npm install instead of npm ci)
RUN npm install --only=production

# Copy application code
COPY . .

# Expose port (Railway will override with its own PORT)
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]