angular.module('todoApp').controller('HomeController', ['$scope', 'TaskService', function($scope, TaskService) {
    $scope.tasks = [];
    $scope.resetTask = {
        title: '',
        description: '',
        due_date: ''
    };
    $scope.task = angular.copy($scope.resetTask);
    $scope.editMode = false;
    $scope.editId = null;

    // Função para pegar as tarefas
    $scope.getTasks = function() {
        TaskService.getTasks().then(function(tasks) {
            $scope.tasks = tasks;
        });
    };

    // Função para salvar uma tarefa
    $scope.saveTask = function() {
        if ($scope.editMode && $scope.editId !== null) {
        TaskService.updateTask($scope.editId, $scope.task).then(function() {
            $scope.getTasks();
        });
        } else {
        TaskService.addTask($scope.task).then(function() {
            $scope.getTasks();
        });
        }
        $scope.task = angular.copy($scope.resetTask);
        $scope.editMode = false;
        $scope.editId = null;
    };

    // Função para editar uma tarefa
    $scope.editTask = function(task) {
        $scope.task = angular.copy(task);
        $scope.editMode = true;
        $scope.editId = task.id;
    };

    // Função para deletar uma tarefa
    $scope.deleteTask = function(id) {
        TaskService.deleteTask(id).then(function() {
            $scope.getTasks();
        });
    };

    // Função para marcar tarefa como feita
    $scope.markTaskAsDone = function(id) {
        TaskService.setTaskAsDone(id).then(function() {
            $scope.getTasks();
        });
    };

    // Carregar as tarefas ao iniciar o controller
    $scope.getTasks();
    }]);

