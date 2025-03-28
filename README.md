<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

# Stalo Challenge 🚀

Olá 👋 essa é minha solução para o desafio Laravel da Stalo

## Como rodar esta aplicação

1. Clone o repositório:
    ```bash
    git clone git@github.com:lucas-araujo-costa/stalo-challenge.git
    cd stalo-challenge
    ```
2. Instale as dependências do Composer:

    ```bash
    composer install
    ```

3. Configure o arquivo `.env`: Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente, como conexão com o banco de dados.

    ```bash
    cp .env.example .env
    ```

4. Inicie o servidor:
    ```bash
    php artisan serve
    ```
5. Inicie a aplicação front-end:
    ```bash
    cd frontend
    php -S localhost:8080
    ```
6. Acesse o domínio http://localhost:8080
