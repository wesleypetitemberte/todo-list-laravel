angular.module('todoApp').service('TaskService', ['$http', function($http) {
    const API_URL = 'http://localhost:8000/api';

    function getConfig() {
        return {
            headers: {
                'x-api-key': 'SUA_API_KEY',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
        };
    }

    function handleRequest(promise) {
        return promise
        .then(response => response.data)
        .catch(error => {
            console.error('Erro na requisição:', error);
            throw error;
        });
    }

    // Obter todas as tarefas
    this.getTasks = function() {
        return handleRequest($http.get(`${API_URL}/tasks`, getConfig()));
    };

    // Adicionar uma nova tarefa
    this.addTask = function(task) {
        return handleRequest($http.post(`${API_URL}/tasks`, task, getConfig()));
    };

    // Atualizar uma tarefa existente
    this.updateTask = function(taskId, updatedTask) {
        return handleRequest($http.put(`${API_URL}/tasks/${taskId}`, updatedTask, getConfig()));
    };

    // Deletar uma tarefa
    this.deleteTask = function(taskId) {
        return handleRequest($http.delete(`${API_URL}/tasks/${taskId}`, getConfig()));
    };

    this.setTaskAsDone = function(taskId) {
        return handleRequest($http.patch(`${API_URL}/tasks/${taskId}`, { is_done: true }, getConfig()));
    };
}]);