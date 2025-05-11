angular.module('todoApp').controller('RegisterController', function($scope, $location, AuthService) {
    $scope.user = {
        email: '',
        password: '',
        password2: ''
    };

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
                $location.path('/home');
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
});
