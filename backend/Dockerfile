FROM php:8.2-cli-alpine

# Installation des dépendances système et extensions PHP nécessaires pour Laravel et MySQL
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    oniguruma-dev \
    linux-headers \
    mysql-client

RUN docker-php-ext-install pdo pdo_mysql bcmath mbstring gd

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copie du code backend
COPY . .

# Droits sur le répertoire storage et bootstrap/cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache 2>/dev/null || true

EXPOSE 8000

# Commande de démarrage avec le serveur de développement Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
