FROM php:8.2-cli

RUN apt-get update -y && apt-get install -y openssl zip unzip git curl
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN php artisan config:clear

EXPOSE 10000
CMD php artisan serve --host 0.0.0.0 --port 10000