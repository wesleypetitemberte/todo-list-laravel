<?php

namespace App\Http\Controllers;

use App\Repositories\TaskRepository;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index()
    {
        return response()->json($this->taskRepository->getAllByUser(auth()->id()));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'is_done' => 'boolean',
        ]);

        $data['user_id'] = auth()->id();

        return response()->json($this->taskRepository->create($data), 201);
    }

    public function show($id)
    {
        $task = $this->taskRepository->findById($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'is_done' => 'boolean',
        ]);

        if (!$this->taskRepository->update($id, $data)) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json(['message' => 'Task updated successfully'], 200);
    }

    public function destroy($id)
    {
        if (!$this->taskRepository->delete($id)) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json(['message' => 'Task deleted successfully'], 200);
    }

    public function partialUpdate($id)
    {
        if (!$this->taskRepository->markAsDone($id)) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json(['message' => 'Task done successfully'], 200);
    }
}
