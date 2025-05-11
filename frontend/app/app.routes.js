angular
    .module('todoApp')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/pages/home/home.template.html',
                controller: 'HomeController'
            })
            .when('/login', {
                templateUrl: 'app/pages/login/login.template.html',
                controller: 'LoginController'
            })
            .when('/registrar', {
                templateUrl: 'app/pages/register/register.template.html',
                controller: 'RegisterController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
