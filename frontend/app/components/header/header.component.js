angular.module('todoApp').component('appHeader', {
    templateUrl: 'app/components/header/header.template.html',
    controller: ['$location', '$rootScope', function($location, $rootScope) {
        const vm = this;

        $rootScope.isAuthenticated = !!localStorage.getItem('token');

        if ($rootScope.isAuthenticated) {
            $location.path('/');
        } else {
            $location.path('/login');
        }

        vm.logout = function() {
            localStorage.removeItem('token');
            $rootScope.isAuthenticated = false;
            $location.path('/login');
        };
    }]
});