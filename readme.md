# EasyBreezyArticle Installation Guide

This guide provides step-by-step instructions to help you set up an existing Vue.js and Laravel project on your local machine. Follow the instructions below to get started with these frameworks.

## Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/en/download/)
- Composer: [Download and Install Composer](https://getcomposer.org/download/)
- Docker
- 
## React Setup

1. Open your terminal or command prompt.

2. Navigate to the root directory of your ReactJS project (frontend directory).

3. Copy .env.example to .env

4. Run the following command to install the project dependencies:

   ```
   docker-compose -f docker-compose.dev.yml up
   ```
   This will start local server on http://localhost:3000.



## Laravel Setup

1. Open your terminal or command prompt.

2. Navigate to the root directory of your Laravel project (backend directory).

3. Run the following command to install the project dependencies:

   ```
   composer install
   ```

4. After the installation is complete, copy the `.env.example` file and rename it to `.env`. You can use the following command:

   ```
   cp .env.example .env
   ```

5. Generate a unique application key by running the following command:

   ```
   php artisan key:generate
   ```

6. Run sail using the following command:

   ```
   ./vendor/bin/sail up
   ```
7. run migrations

   ```
   ./vendor/bin/sail artisan migrate
   ```
   
## Running the Project
1. Visit http://localhost:3000 to access EasyBreezyArticle