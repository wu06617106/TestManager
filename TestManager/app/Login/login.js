'use strict';
app.controller("LoginController", ['$scope', '$location', 'authService', '$timeout', function ($scope, $location, authService, $timeout) {
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
            //$timeout(function () {
            //    $location.path('/Home/Index');
            //    $scope.$apply();
            //})
            //var url = $location.path('/Home/Index');
            //location.assign('/Home/Index');
            //$location.path('/Home');
            $scope.successMsgVisible = { 'visibility': 'visible' };
            $scope.errorMsgVisible = { 'visibility': 'hidden' };

        },
         function (err) {
             $scope.message = err.error_description;
             $scope.errorMsgVisible = { 'visibility': 'visible' };
             $scope.successMsgVisible = { 'visibility': 'hidden' };
         });
    };
}]);