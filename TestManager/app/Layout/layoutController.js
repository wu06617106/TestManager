'use strict';
var layoutControllers = angular.module('layoutControllers', []);
layoutControllers.controller('layoutController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
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
}]);