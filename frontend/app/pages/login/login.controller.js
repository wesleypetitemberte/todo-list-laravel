angular.module('todoApp').controller('LoginController', ['$scope', 'AuthService', '$location', function($scope, AuthService, $location) {
    $scope.user = {
        email: '',
        password: ''
    };

    $scope.fields = [
        { name: 'email', title: 'Email', type: 'email', placeholder: 'Digite seu email', required: true },
        { name: 'password', title: 'Senha', type: 'password', placeholder: 'Digite sua senha', required: true }
    ];

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
}]);
