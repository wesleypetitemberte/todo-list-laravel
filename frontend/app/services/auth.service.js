angular.module('todoApp').service('AuthService', ['$http', '$q', '$window', '$location', function($http, $q, $window, $location) {
    const API_URL = 'http://localhost:8000/api';

    function handleRequest(promise) {
        return promise.then(function(response) {
            return response.data;
        }).catch(function(error) {
            console.error('Erro na requisição:', error);
            if (error.status === -1) {
                console.error('Possível erro de CORS ou servidor offline');
            }
            return $q.reject(error);
        });
    }

    return {
        login: function(email, password) {
            return handleRequest(
                $http.post(API_URL + '/auth/login', { email: email, password: password })
            );
        },

        register: function(user) {
            return handleRequest(
                $http.post(API_URL + '/auth/register', user)  
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
