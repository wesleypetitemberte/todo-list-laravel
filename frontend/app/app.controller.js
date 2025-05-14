angular.module('todoApp').controller('AppController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
    $rootScope.isAuthenticated = !!localStorage.getItem('token');

    $scope.logout = function() {
        localStorage.removeItem('token');

        $location.path('/login');
        $rootScope.isAuthenticated = false;
    };
}]);
