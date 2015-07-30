'use strict';

app.controller('layoutController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        //$location.path('/home');
        location.assign('/Home/Login');
    }
    $scope.authentication = authService.authentication;
    //$scope.person = authService.person;
}]);