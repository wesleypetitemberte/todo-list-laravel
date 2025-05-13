angular.module('todoApp').factory('AuthInterceptor', function() {
    return {
        request: function(config) {
            const token = localStorage.getItem('token');

            config.headers = config.headers || {};
            config.headers['Content-Type'] = 'application/json';
            
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
        }
    };
});

angular.module('todoApp')
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);

