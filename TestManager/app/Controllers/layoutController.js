'use strict';
var layoutControllers = angular.module('layoutControllers', []);
layoutControllers.controller('layoutController', ['$scope', '$location', 'authService', 'localStorageService', function ($scope, $location, authService, localStorageService) {
    $scope.logOut = function () {
        authService.logOut();
        $location.path('/Home/Index');
    }

    $scope.logIn = function () {
        $location.path('/Home/Index');
    }

    $scope.register = function () {
        $location.path('/Home/Register');
    }
    $scope.authentication = authService.authentication;

    $scope.load = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            if ($location.path() == '/Home/Index')
            {
                $location.path('/TestCase/Index');
            }           
        } else {
            $location.path('/Home/Index');
        }
    }
}]);