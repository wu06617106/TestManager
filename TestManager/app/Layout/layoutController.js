'use strict';
var layoutControllers = angular.module('layoutControllers', []);
layoutControllers.controller('layoutController', ['$scope', '$location', 'authService', 'localStorageService', function ($scope, $location, authService, localStorageService) {
    $scope.logOut = function () {
        authService.logOut();
        $location.path('/Home/Login');
    }

    $scope.logIn = function () {
        $location.path('/Home/Login');
    }

    $scope.register = function () {
        $location.path('/Home/Register');
    }
    $scope.authentication = authService.authentication;

    $scope.load = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            $location.path('/Home/Index');
        } else {
            $location.path('/Home/Login"');
        }
    }
}]);