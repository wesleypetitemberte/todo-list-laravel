angular.module('todoApp').controller('LoginController', ['$scope', 'AuthService', '$location', '$rootScope', function($scope, AuthService, $location, $rootScope) {
    $scope.user = {
        email: '',
        password: ''
    };

    $scope.showMessageError = false;
    $scope.messageError = 'Falha no login!';

    $scope.login = function() {
        $scope.showMessageError = false;

        AuthService.login($scope.user.email, $scope.user.password)
        .then(function(response) {
            localStorage.setItem('token', response.token);
            $rootScope.isAuthenticated = true;
            $location.path('/');
        })
        .catch(function(error) {
            console.error(error);
            $scope.messageError = 'Usuario ou senha inválidos!';
            $scope.showMessageError = true;
        });
    };
}]);
