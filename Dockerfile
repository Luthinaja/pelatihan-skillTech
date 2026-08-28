# Stage 1: Build Frontend Assets
FROM node:20-alpine AS node_builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: PHP Application
FROM php:8.2-cli
RUN apt-get update -y && apt-get install -y openssl zip unzip git curl libpng-dev libonig-dev libxml2-dev sqlite3 libsqlite3-dev
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo pdo_mysql pdo_sqlite mbstring

WORKDIR /app
COPY . .
COPY --from=node_builder /app/public/build ./public/build

RUN composer install --no-dev --optimize-autoloader
RUN touch database/database.sqlite
RUN chmod -R 777 storage bootstrap/cache database

EXPOSE 10000

# Jalankan migrate & seed saat container menyala, lalu jalankan server
CMD php artisan migrate --force && php artisan serve --host 0.0.0.0 --port 10000