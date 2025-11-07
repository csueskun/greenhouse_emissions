# Use the latest LTS version of Node
FROM node:22

# Set working directory inside container
WORKDIR /app

# Copy only package files first for dependency caching
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the Angular source code (everything inside app/)
COPY app/ ./

# Expose the Angular dev server port
EXPOSE 4200

# Default command (dev mode)
CMD ["npm", "run", "start"]
