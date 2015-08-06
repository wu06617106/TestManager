'use strict';
var loginControllers = angular.module('loginControllers', []);
loginControllers.controller('loginController', ['$scope', '$location', 'authService', '$timeout', 'localStorageService', function ($scope, $location, authService, $timeout, localStorageService) {
    $scope.loginData = {
        account: "",
        password: ""
    };
    $scope.successMsgVisible = { 'visibility': 'hidden' };
    $scope.errorMsgVisible = { 'visibility': 'hidden' };

    $scope.person;
    $scope.message = "";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {
            $scope.person = response;
            $location.path('/Home/Index');
            $scope.successMsgVisible = { 'visibility': 'visible' };
            $scope.errorMsgVisible = { 'visibility': 'hidden' };
        },
         function (err) {
             $scope.message = err.error_description;
             $scope.errorMsgVisible = { 'visibility': 'visible' };
             $scope.successMsgVisible = { 'visibility': 'hidden' };
         });
    };

    $scope.load = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            $location.path('/Home/Index');
        } else {
            $location.path('/Home/Login"');
        }
    }
}]);