var personModule = angular.module("PersonModule", []);
personModule.controller("PersonCtrl", function ($scope, $http) {
    $scope.account;
    $scope.password;
    $scope.person;
    $scope.registerAccount;
    $scope.registerPassword;
    $scope.registerName;
    $scope.successMsgVisible = { 'visibility': 'hidden' };
    $scope.errorMsgVisible = { 'visibility': 'hidden' };
    $scope.submit = function () {
        var personData =
            {
                Account: $scope.account,
                Password: $scope.password
            }
        $http.post("/api/Persons/LogIn", personData).success(function (data, status, headers, config) {
            $scope.person = data[0];
            $scope.successMsgVisible = { 'visibility': 'visible' };
            $scope.errorMsgVisible = { 'visibility': 'hidden' };
        }).error(function (data, status, headers, config) {
            $scope.errorMsgVisible = { 'visibility': 'visible' };
            $scope.successMsgVisible = { 'visibility': 'hidden' };
        });
    }

    $scope.regigster = function () {
        var personData =
            {
                Account: $scope.RegisterAccount,
                Password: $scope.RegisterPassword,
                PersonName: $scope.RegisterName
            }
        $http.post("/api/Persons/Register", personData).success(function (data, status, headers, config) {
            $scope.person = data;
            $scope.successMsgVisible = { 'visibility': 'visible' };
            $scope.errorMsgVisible = { 'visibility': 'hidden' };
        }).error(function (data, status, headers, config) {
            $scope.errorMsgVisible = { 'visibility': 'visible' };
            $scope.successMsgVisible = { 'visibility': 'hidden' };
        });
    }
})