FROM php:8.1-fpm

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo pdo_mysql zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar diretório de trabalho
WORKDIR /var/www/html

# Copiar arquivos do projeto
COPY . .

# Instalar dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Ajustar permissões para o Laravel
RUN chmod -R 775 storage bootstrap/cache storage/logs \
    && chown -R www-data:www-data storage bootstrap/cache storage/logs \
    && chown -R www-data:www-data /var/www

# Expor a porta
EXPOSE 9000

CMD ["php-fpm"]
