angular.module('todoApp').controller('RegisterController', ['$scope', '$location', 'AuthService', '$rootScope', function($scope, $location, AuthService, $rootScope) {
    $scope.user = {
        email: '',
        password: '',
        password_confirmation: ''
    };

    $scope.showMessageError = false;
    $scope.messageError = 'Falha no login!';

    $scope.register = function() {
        $scope.showMessageError = false;

        AuthService.register($scope.user).then(function(response) {
            if (response.token) {
                localStorage.setItem('token', response.token);
                $rootScope.isAuthenticated = true;
                $location.path('/');
            } else {
                console.error('Token is undefined');
                $scope.messageError = 'Falha no login!';
                $scope.showMessageError = true;
            }
        }).catch(function(error) {
            console.error(error);
            $scope.messageError = 'Email já cadastrado!';
            $scope.showMessageError = true;
        });
    };
}]);
