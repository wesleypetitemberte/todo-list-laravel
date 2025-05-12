# Todo-List CRUD (Laravel 10 + AngularJS 1.6 + JWT + Docker)

Projeto de lista de tarefas (CRUD) usando Laravel 10 no back‑end, AngularJS 1.6 no front‑end, autenticação JWT e ambiente Docker.

---

## 🔧 Tecnologias

- Laravel 10 + PHP 8
- AngularJS 1.6
- JWT (tymon/jwt-auth)
- Docker & Docker Compose
- MySQL

---

## 🚀 Rápido Start

1. Clone o repo:
   ```bash
   git clone https://github.com/wesleypetitemberte/todo-list-laravel && cd todo-list-laravel
   ```
2. Copie variáveis de ambiente:
   ```bash
   cp backend/.env.example backend/.env
   ```
3. Suba containers:
   ```bash
   docker compose up -d --build
   ```
4. Gere chave e migre DB:
   ```bash
   docker compose exec app composer install
   docker compose exec app php artisan key:generate 
   docker compose exec app php artisan jwt:secret 
   docker compose exec app php artisan migrate
   ```
5. Instale front:
   ```bash
   cd frontend && npm install
   ```
6. Acesse:
   - API: http://localhost:8000/api
   - UI: http://localhost:8080

---

## 📦 Endpoints Básicos

| Método | Rota             | Ação            |
| ------ | ---------------- | --------------- |
| GET    | `/api/tasks`     | Listar tarefas  |
| POST   | `/api/tasks`     | Criar tarefa    |
| PUT    | `/api/tasks/:id` | Atualizar tarefa|
| DELETE | `/api/tasks/:id` | Deletar tarefa  |

Use header `Authorization: Bearer <token>` para rotas protegidas.

---

## 📝 Front‑end

Em `frontend/config.js`, aponte para sua API:
```js
angular.module('app').constant('API_URL', 'http://localhost:8000/api');
```

---

## 🛠️ Estrutura

```
├── backend/      # Laravel
├── frontend/     # AngularJS
└── docker-compose.yml
```

---
✨ _Projeto desenvolvido pela Wesley Petitemberte_