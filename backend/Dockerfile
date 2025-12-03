FROM node:20-alpine

WORKDIR /app

# Copy package files first (caches npm install)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Build TypeScript (this creates dist/)
RUN npm run build

# Expose port for backend
EXPOSE 5000

# Default command: backend
CMD ["node", "dist/server.js"]
