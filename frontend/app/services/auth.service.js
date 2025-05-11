angular.module('todoApp').service('AuthService', ['$http', '$q', '$window', '$location', function($http, $q, $window, $location) {
    const API_URL = 'http://localhost:8000/api';

    function getConfig() {
        return {
            headers: {
                'x-api-key': 'SUA_API_KEY',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
        };
    }

    function handleRequest(promise) {
        return promise.then(function(response) {
            return response.data;
        }).catch(function(error) {
            console.error('Erro na requisição:', error);
            return $q.reject(error);
        });
    }

    return {
        login: function(email, password) {
            return handleRequest(
                $http.post(API_URL + '/auth/login', { email: email, password: password }, getConfig())
            );
        },

        register: function(user) {
            return handleRequest(
                $http.post(API_URL + '/auth/register', user, getConfig())
            );
        },

        canActivate: function() {
            const token = $window.localStorage.getItem('token');
            if (token) {
                return true;
            } else {
                $location.path('/');
                return false;
            }
        }
    };
}]);
