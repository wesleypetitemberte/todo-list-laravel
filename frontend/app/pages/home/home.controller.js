angular.module('todoApp').controller('HomeController', ['$scope', 'TaskService', '$rootScope', '$location', function($scope, TaskService, $rootScope, $location) {
    $scope.tasks = [];
    $scope.resetTask = {
        title: '',
        description: '',
        due_date: ''
    };
    $scope.task = angular.copy($scope.resetTask);
    $scope.editMode = false;
    $scope.editId = null;
    $scope.today = new Date();

    // Função para verificar autenticação
    const checkAuthentication = function() {
        if (!$rootScope.isAuthenticated) {
            $location.path('/login');
            return false;
        }
        return true;
    };

    // Função para pegar as tarefas
    $scope.getTasks = async function() {
        if (!checkAuthentication()) return;

        try {
            const tasks = await TaskService.getTasks();
            $scope.tasks = tasks;
            $scope.$apply();
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    };

    // Função para salvar uma tarefa
    $scope.saveTask = async function() {
        if (!checkAuthentication()) return;

        try {
            if ($scope.editMode && $scope.editId !== null) {
                await TaskService.updateTask($scope.editId, $scope.task);
            } else {
                await TaskService.addTask($scope.task);
            }
            await $scope.getTasks();
            $scope.task = angular.copy($scope.resetTask);
            $scope.editMode = false;
            $scope.editId = null;
        } catch (error) {
            console.error('Erro ao salvar tarefa:', error);
        }
    };

    // Função para editar uma tarefa
    $scope.editTask = async function(task) {
        if (!checkAuthentication()) return;

        try {
            const taskCopy = angular.copy(task);

            if (typeof taskCopy.due_date === 'string' && taskCopy.due_date.includes('/')) {
                const [dd, mm, yyyy] = taskCopy.due_date.split('/');
                taskCopy.due_date = new Date(yyyy, mm - 1, dd);
            }
            $scope.task = taskCopy;
            $scope.editMode = true;
            $scope.editId = task.id;
        } catch (error) {
            console.error('Erro ao editar tarefa:', error);
        }
    };

    // Função para deletar uma tarefa
    $scope.deleteTask = async function(id) {
        if (!checkAuthentication()) return;

        try {
            await TaskService.deleteTask(id);
            await $scope.getTasks();
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
        }
    };

    // Função para marcar tarefa como feita
    $scope.markTaskAsDone = async function(id) {
        if (!checkAuthentication()) return;

        try {
            await TaskService.setTaskAsDone(id);
            await $scope.getTasks();
        } catch (error) {
            console.error('Erro ao marcar tarefa como feita:', error);
        }
    };

    $scope.getTasks();
}]);

