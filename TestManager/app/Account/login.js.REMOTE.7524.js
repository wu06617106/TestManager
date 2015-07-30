'use strict';
app.controller("LoginController", ['$scope', '$location', 'authService', '$timeout', function ($scope, $location, authService, $timeout) {
    $scope.loginData = {
        account: "",
        password: ""
    };
    $scope.successMsgVisible = { 'visibility': 'hidden' };
    $scope.errorMsgVisible = { 'visibility': 'hidden' };
    $scope.errorMessage = "";

    $scope.login = function () {
        authService.login($scope.loginData).then(function (response) {
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