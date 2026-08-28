# Tahap 1: Build file CSS & JS Vite
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Tahap 2: Setup PHP Server
FROM php:8.2-cli
RUN apt-get update -y && apt-get install -y openssl zip unzip git curl libpng-dev sqlite3 libsqlite3-dev
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo pdo_sqlite

WORKDIR /app
COPY . .
COPY --from=frontend /app/public/build ./public/build

RUN composer install --no-dev --optimize-autoloader

# Buat folder & file database otomatis di dalam server
RUN mkdir -p database
RUN touch database/database.sqlite
RUN chmod -R 777 storage bootstrap/cache database

EXPOSE 10000

CMD php artisan migrate --force && php artisan serve --host 0.0.0.0 --port 10000