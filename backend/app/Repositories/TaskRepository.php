<?php

namespace App\Repositories;

use App\Models\Task;

class TaskRepository
{
    /**
     * Get all tasks.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAll()
    {
        return Task::all();
    }

    public function getAllByUser(int $userId)
    {
        return Task::where('user_id', $userId)->get();
    }

    /**
     * Find a task by ID.
     *
     * @param int $id
     * @return Task|null
     */
    public function findById(int $id): ?Task
    {
        return Task::find($id);
    }

    /**
     * Create a new task.
     *
     * @param array $data
     * @return Task
     */
    public function create(array $data): Task
    {
        return Task::create($data);
    }

    /**
     * Update an existing task.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $task = $this->findById($id);
        return $task ? $task->update($data) : false;
    }

    /**
     * Delete a task by ID.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $task = $this->findById($id);
        return $task ? $task->delete() : false;
    }
}
