'use strict';
 
angular
    .module('app', ['ngRoute'])
    .config(config)
    .run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider.when('/company', {
        controller: 'CompanyController',
        templateUrl: 'company/company.html',
        controllerAs: 'vm'
    }).when('/login', {
        controller: 'LoginController',
        templateUrl: 'login/login.html',
        controllerAs: 'vm'
    }).when('/test', {
        controller: 'TestController',
        templateUrl: 'test/test.html',
        controllerAs: 'vm'
    }).when('/employee', {
        controller: 'EmployeeController',
        templateUrl: 'employee/employee.html',
        controllerAs: 'vm'
    }).otherwise({ redirectTo: '/login' });
}


run.$inject = ['$rootScope', '$location', '$http', '$window'];
function run($rootScope, $location, $http, $window) {
    $rootScope.logout = function () {
        console.log('hiddd');
        $window.sessionStorage.setItem('userData', '');
        $http.defaults.headers.common['Authorization'] = 'Basic';
        $location.path('/login');
    }
    var userData = $window.sessionStorage.getItem('userData');
    console.log(userData);
    if (userData) {
        $http.defaults.headers.common['Authorization']
          = 'Basic ' + JSON.parse(userData).authData;
    }
    console.log(userData);
    // $http.defaults.headers.common['Accepts']
    // = 'application/json';
   
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