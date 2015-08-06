﻿'use strict';
var controllers = angular.module('controllers', ['layoutControllers', 'testCaseTreeControllers', 'loginControllers', 'registerControllers', 'layoutControllers']);
var services = angular.module('services', ['authInterceptorService', 'authService', 'testCaseTreeService']);
var directives = angular.module('directives', ['testCaseTreeDirectives']);
var testManagerApp = angular.module('testManagerApp', ['ngRoute', 'angular-loading-bar', 'LocalStorageModule', 'ui.bootstrap', 'controllers', 'services', 'directives']);

testManagerApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Home/Index", {
        controller: "testCaseTreeController",
        templateUrl: "/Home/_Index"
    });

    $routeProvider.when("/Home/Login", {
        controller: "loginController",
        templateUrl: "/Home/_Login"
    });

    $routeProvider.when("/Home/Register", {
        controller: "registerController",
        templateUrl: "/Home/_Register"
    });

    //$routeProvider.when("/Test/Index", {
    //    templateUrl: "/Test/Index"
    //});

    //$routeProvider.when("/Test/Edit", {
    //    templateUrl: "/Test/Edit"
    //});

    $routeProvider.otherwise({ redirectTo: "/Home/Login" });
}]);

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
