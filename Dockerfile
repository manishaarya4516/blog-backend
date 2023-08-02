# Use the official Node.js base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . /app/

# Expose the port that your application listens to (replace 3000 with your actual port)
EXPOSE 5002

# Start the application when the container starts
CMD ["node", "app.js"]
