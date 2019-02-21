'use strict';
 
angular
    .module('app', ['ngRoute'])
    .config(config)
    .run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: 'home/home.html',
        controllerAs: 'vm'
    }).when('/login', {
        controller: 'LoginController',
        templateUrl: 'login/login.html',
        controllerAs: 'vm'
    }).otherwise({ redirectTo: '/login' });
}


run.$inject = ['$rootScope', '$location', '$http', '$window'];
function run($rootScope, $location, $http, $window) {
   
    var userData = $window.sessionStorage.getItem('userData');
    console.log(userData);
    if (userData) {
        $http.defaults.headers.common['Authorization']
          = 'Basic ' + JSON.parse(userData).authData;
    }
    $http.defaults.headers.common['Accepts']
    = 'application/json';
    $rootScope
    .$on('$locationChangeStart', function (event, next, current) {
        var restrictedPage
          = $.inArray($location.path(), ['/login']) === -1;
        var loggedIn
          = $window.sessionStorage.getItem('userData');
          $rootScope.isLogin=!restrictedPage;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
}