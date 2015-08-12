'use strict';
var initControllers = angular.module('initControllers', []);
initControllers.controller('initController', ['$scope', '$location', 'localStorageService', function ($scope, $location, localStorageService) {
    $scope.load = function()
    {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            $location.path('/Home/Index');
        } else {
            $location.path('/Home/Login"');
        }
    }
}]);