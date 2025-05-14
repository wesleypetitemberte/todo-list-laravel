# Todo-List CRUD (Laravel 10 + AngularJS 1.6 + JWT + Docker)

Projeto de lista de tarefas (CRUD) usando Laravel 10 no back‑end, AngularJS 1.6 no front‑end, autenticação JWT e ambiente Docker.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-blue)](https://www.linkedin.com/in/wesley-petitemberte/)

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
   docker compose build
   docker compose up -d
   ```
4. Gere chave e migre DB:
   ```bash
   docker compose exec app composer install
   docker compose exec app php artisan key:generate 
   docker compose exec app php artisan jwt:secret 
   docker compose exec app php artisan migrate
   ```
5. Acesse:
   - API: http://localhost:8000/api
   - FRONTEND: http://localhost:5442
6. Execute testes:
   ```bash
   docker compose exec app php artisan test
   ```

---

## 📦 Endpoints

| Método | Rota             | Ação            |
| ------ | ---------------- | --------------- |
| GET    | `/api/tasks`     | Listar tarefas  |
| POST   | `/api/tasks`     | Criar tarefa    |
| PUT    | `/api/tasks/:id` | Atualizar tarefa|
| DELETE | `/api/tasks/:id` | Deletar tarefa  |
| PATCH  | `/api/tasks/:id` | Concluí tarefa  |

---

## 🛠️ Estrutura

```
├── backend/      # Laravel 10
├── frontend/     # AngularJS 1.6
└── docker-compose.yml
```

---
✨ _Projeto desenvolvido pela Wesley Petitemberte_