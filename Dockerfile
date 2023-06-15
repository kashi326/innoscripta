# Use an official Node.js image as the base image for the frontend
FROM node:14 as frontend-builder

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the package.json and package-lock.json files to the working directory
COPY frontend/package*.json ./

# Install the frontend dependencies
RUN npm ci

# Copy the frontend project files to the working directory
COPY frontend/ .

# Build the frontend project
RUN npm run build

# Use an official PHP image as the base image for the backend
FROM php:8.0-fpm as backend-builder

# Set the working directory for the backend
WORKDIR /app/backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the backend project files to the working directory
COPY backend/ .

# Install backend dependencies
RUN composer install --no-interaction --no-scripts --no-progress

# Copy the built frontend files to the Nginx web root
FROM nginx:1.21

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the Nginx configuration file
COPY nginx/nginx.conf /etc/nginx/conf.d

# Set the working directory to the Nginx web root
WORKDIR /var/www/html

# Copy the built frontend files from the frontend-builder stage to the Nginx web root
COPY --from=frontend-builder /app/frontend/build .

# Copy the built backend files from the backend-builder stage to the working directory
COPY --from=backend-builder /app/backend .

# Expose ports
EXPOSE 80

# Start Nginx and PHP-FPM services
CMD service php8.0-fpm start && nginx -g "daemon off;"
