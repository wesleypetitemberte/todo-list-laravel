<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use App\Models\Task;
use Tests\TestCase;

class TaskTest extends TestCase
{
    private function authenticate()
    {
        // Cria um usuário com uma senha conhecida
        $user = User::factory()->create([
            'password' => bcrypt('password'),
        ]);

        // Faz login
        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        // Verifica se o login foi bem-sucedido
        $response->assertStatus(200);

        // Ajuste conforme sua API — se usa 'access_token' em vez de 'token'
        $token = $response['token'] ?? $response['access_token'] ?? null;

        $this->assertNotNull($token, 'Token não retornado no login.');

        // Retorna headers de autenticação e usuário autenticado
        return [
            'headers' => ['Authorization' => "Bearer $token"],
            'user' => $user,
        ];
    }

    public function test_user_can_create_task()
    {
        $auth = $this->authenticate();
        $headers = $auth['headers'];

        $payload = [
            'title' => 'New Task',
            'description' => 'Task description',
            'due_date' => now()->addWeek()->toDateTimeString(),
            'is_done' => false,
        ];

        $response = $this->postJson('/api/tasks', $payload, $headers);
        $response->assertStatus(201)->assertJsonFragment(['title' => 'New Task']);
    }

    public function test_user_can_list_tasks()
    {
        $auth = $this->authenticate();
        $headers = $auth['headers'];
        $user = $auth['user'];

        Task::factory()->count(3)->create([
            'user_id' => $user->id,
        ]);

        $response = $this->getJson('/api/tasks', $headers);
        $response->assertStatus(200)->assertJsonCount(3);
    }

    public function test_user_can_update_task()
    {
        $auth = $this->authenticate();
        $headers = $auth['headers'];
        $user = $auth['user'];

        $task = Task::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'due_date' => now()->addMonth()->toDateTimeString(),
            'is_done' => true,
        ], $headers);

        $response->assertStatus(200)->assertJsonFragment(['message' => 'Task updated successfully']);
    }

    public function test_user_can_delete_task()
    {
        $auth = $this->authenticate();
        $headers = $auth['headers'];
        $user = $auth['user'];

        $task = Task::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->deleteJson("/api/tasks/{$task->id}", [], $headers);
        $response->assertStatus(200)->assertJsonFragment(['message' => 'Task deleted successfully']);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }
}
