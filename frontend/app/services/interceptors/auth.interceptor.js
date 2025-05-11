// Ensure only one instance of the interceptor is defined
angular.module('todoApp').factory('AuthInterceptor', function() {
    return {
        request: function(config) {
            const token = localStorage.getItem('token');

            config.headers = config.headers || {};
            config.headers['x-api-key'] = 'SUA_API_KEY';
            
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

