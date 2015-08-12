'use strict';
var controllers = angular.module('controllers', ['layoutControllers', 'testCaseTreeControllers', 'loginControllers', 'registerControllers', 'layoutControllers', 'tabControllers', 'addTestPlanControllers']);
var services = angular.module('services', ['authInterceptorService', 'authService', 'testApiService', 'testCaseTreeService']);
var directives = angular.module('directives', ['testCaseTreeDirectives']);
var testManagerApp = angular.module('testManagerApp', ['ngRoute', 'angular-loading-bar', 'LocalStorageModule', 'ui.bootstrap', 'controllers', 'services', 'directives']);

testManagerApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/TestCase/Index", {
        controller: "testCaseTreeController",
        templateUrl: "/TestCase/_Index"
    });

    $routeProvider.when("/TestPlan/AddTestPlan", {
        controller: "addTestPlanController",
        templateUrl: "/TestPlan/_AddTestPlan"
    });

    $routeProvider.when("/Home/Index", {
        controller: "loginController",
        templateUrl: "/Home/_Index"
    });

    $routeProvider.when("/Home/Register", {
        controller: "registerController",
        templateUrl: "/Home/_Register"
    });

    $routeProvider.when("/TestCase/EditTestCase/:id", {
        templateUrl: function(params) {
            return '/TestCase/_EditTestCase/' + params.id;
        }
    });

    $routeProvider.when("/TestCase/TestCasesDetails/:id", {
        templateUrl: function (params) {
            return '/TestCase/_TestCasesDetails/' + params.id;
        }
    });

    $routeProvider.otherwise({ redirectTo: "/Home/Index" });
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
