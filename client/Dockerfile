# Use Node.js base image
FROM node:20.14.0

# Set the working directory inside the container
WORKDIR /usr/src/client

# Copy the package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend files into the container
COPY . .

# Expose port 5173 for the frontend app
EXPOSE 5173

# Serve the built frontend app
CMD ["npm","run","dev"]
