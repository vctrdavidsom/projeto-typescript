# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and NestJS CLI globally
RUN npm install && \
    npm install -g @nestjs/cli

# Copy source code
COPY . .

# Build the application with verbose output
RUN echo "Current directory contents:" && ls -la && \
    echo "Running npm build..." && \
    npm run build && \
    echo "Build completed. Checking dist directory:" && \
    ls -la dist/ || (echo "Build failed. Showing error logs:" && cat /app/nest-debug.log)

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/node_modules ./node_modules/

# Verify dist directory exists in production stage
RUN ls -la dist/

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"] 