# backend/Dockerfile

FROM node:18

# Set working directory in container
WORKDIR /app

# Copy dependencies definition
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the server using nodemon
CMD ["npm", "run", "dev"]
