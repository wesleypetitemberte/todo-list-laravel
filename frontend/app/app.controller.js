angular.module('todoApp').controller('AppController', ['$scope', function($scope) {
    $scope.isAuthenticated = !!localStorage.getItem('token');
}]);
