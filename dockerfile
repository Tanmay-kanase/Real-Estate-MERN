# Set the base image for the backend
FROM node:20.14.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files from the root directory
COPY package*.json ./

# Install backend dependencies from root
RUN npm install

# Copy the API source files into the container
COPY . .

# Expose port 8888 for the backend API
EXPOSE 8888

# Start the backend server
CMD ["npm", "run","dev"]
