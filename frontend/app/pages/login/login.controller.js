angular.module('todoApp').controller('LoginController', function($scope, AuthService, $location) {
    $scope.user = {
        email: '',
        password: ''
    };

    $scope.messageFeedback = 'Falha no login!';
    $scope.showMessage = false;

    $scope.login = function() {
        $scope.showMessage = false;

        AuthService.login($scope.user.email, $scope.user.password)
        .then(function(response) {
            localStorage.setItem('token', response.data.token);
            $location.path('/');
        })
        .catch(function(error) {
            console.error(error);
            $scope.showMessage = true;
        });
    };
});
