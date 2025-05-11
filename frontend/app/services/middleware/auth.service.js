angular.module('todoApp').factory('AuthService', function($http, $window, $location) {
    let service = {};
    const ENDPOINT_API = 'http://localhost:3000/api/v1';

    function getHeaders() {
        return {
            'x-api-key': environment.API_KEY,
            'Authorization': 'Bearer ' + ($window.localStorage.getItem('token') || '')
        };
    }

    service.login = function(email, password) {
        return $http({
            method: 'POST',
            url: ENDPOINT_API + '/auth/login',
            data: { email: email, password: password },
            headers: getHeaders()
        }).then(function(response) {
            return response.data; // retorna o objeto { token: string }
        });
    };

    service.register = function(user) {
        return $http({
            method: 'POST',
            url: ENDPOINT_API + '/auth/register',
            data: user,
            headers: getHeaders()
        }).then(function(response) {
            return response.data; // retorna o usuário registrado
        });
    };

    service.canActivate = function() {
        const token = $window.localStorage.getItem('token');
        if (token) {
            return true;
        } else {
            $location.path('/');
            return false;
        }
    };

    return service;
});
