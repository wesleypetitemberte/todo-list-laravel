angular.module('todoApp').controller('RegisterController', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
    $scope.user = {
        email: '',
        password: '',
        password2: ''
    };

    $scope.fields = [
        { name: 'email', title: 'Email', type: 'email', placeholder: 'Digite seu email', required: true },
        { name: 'password', title: 'Senha', type: 'password', placeholder: 'Digite sua senha', required: true },
        { name: 'password2', title: 'Confirme sua senha', type: 'password', placeholder: 'Digite sua senha novamente', required: true }
    ];

    $scope.messageFeedback = 'Falha no login!';
    $scope.showMessage = false;

    $scope.register = function() {
        $scope.showMessage = false;

        if ($scope.user.password !== $scope.user.password2) {
            $scope.messageFeedback = 'As senhas não coincidem!';
            $scope.showMessage = true;
            return;
        }

        if (!isValidEmail($scope.user.email)) {
            $scope.messageFeedback = 'Email inválido!';
            $scope.showMessage = true;
            return;
        }

        AuthService.register($scope.user).then(function(response) {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                $location.path('/');
            } else {
                console.error('Token is undefined');
                $scope.messageFeedback = 'Falha no login!';
                $scope.showMessage = true;
            }
        }).catch(function(error) {
            console.error(error);
            $scope.messageFeedback = 'Falha no login!';
            $scope.showMessage = true;
        });
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}]);
