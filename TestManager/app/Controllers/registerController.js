'use strict';
var registerControllers = angular.module('registerControllers', []);
registerControllers.controller('registerController', ['$scope', '$location', 'authService', '$timeout', function ($scope, $location, authService, $timeout) {
    $scope.registerData = {
        Account: "",
        Password: "",
        PersonName: ""
    };
    $scope.successMsgVisible = { 'visibility': 'hidden' };
    $scope.errorMsgVisible = { 'visibility': 'hidden' };
    $scope.errorMessage = "";

    $scope.register = function () {
        authService.saveRegistration($scope.registerData).then(function (response) {

            //$location.path('/Home');
            $scope.successMsgVisible = { 'visibility': 'visible' };
            $scope.errorMsgVisible = { 'visibility': 'hidden' };

        },
         function (err) {
             $scope.errorMessage = err.Message;
             $scope.errorMsgVisible = { 'visibility': 'visible' };
             $scope.successMsgVisible = { 'visibility': 'hidden' };
         });
    };
}]);