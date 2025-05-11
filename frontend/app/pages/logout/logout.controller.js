angular.module('todoApp').controller('LogoutController', ['$scope', '$location', function($scope, $location) {
    $scope.logout = function() {
        localStorage.removeItem('token');

        $location.path('/login');
    }
    $scope.logout();
}]);
