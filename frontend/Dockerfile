# Use an official Node.js image as the base image for building the app
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight web server (nginx) to serve the production build
FROM nginx:stable-alpine AS production

# Copy the build output to the nginx static directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx configuration file if necessary
# Uncomment the line below and add your nginx.conf file if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for serving the application
EXPOSE 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]