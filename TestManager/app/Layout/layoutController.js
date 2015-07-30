'use strict';
var layoutControllers = angular.module('layoutControllers', []);
layoutControllers.controller('layoutController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
    $scope.logOut = function () {
        authService.logOut();
        //$location.path('/home');
    }
    $scope.authentication = authService.authentication;
}]);