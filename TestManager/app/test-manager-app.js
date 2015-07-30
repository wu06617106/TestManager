'use strict';
var controllers = angular.module('controllers', ['layoutControllers', 'testCaseTreeControllers', 'loginControllers', 'layoutControllers']);
var services = angular.module('services', ['authInterceptorService', 'authService']);
var directives = angular.module('directives', ['testCaseTreeDirectives']);
var testManagerApp = angular.module('testManagerApp', ['ngRoute', 'angular-loading-bar', 'LocalStorageModule', 'ui.bootstrap', 'controllers', 'services', 'directives']);

testManagerApp.config(function ($routeProvider) {

    $routeProvider.when("/", {
        controller: "loginController",
        templateUrl: "/app/Login"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });
});


testManagerApp.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


testManagerApp.config(function ($httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
