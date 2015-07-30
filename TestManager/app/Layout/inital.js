var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule']);

app.config(function ($routeProvider) {

    $routeProvider.when("/Home/Index", {
        controller: "LoginController",
        templateUrl: "/Home/_index"
    });

    $routeProvider.when("/Home/Login", {
        controller: "LoginController",
        templateUrl: "/Home/_login"
    });

    $routeProvider.when("/Home/Register", {
        controller: "RegisterController",
        templateUrl: "/Home/_register"
    });

    $routeProvider.otherwise({ redirectTo: "/Home/Login" });
});


app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


app.config(function ($httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

