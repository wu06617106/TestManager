var PersonModual = angular.module("PersonModual", []);
PersonModual.controller("PersonCTRL", function ($scope, $http) {
    $scope.account;
    $scope.password;
    $scope.person;
    $scope.RegesterAccount;
    $scope.RegesterPassword;
    $scope.RegesterName;
    $scope.successMsgVisible = { 'visibility': 'hidden' };
    $scope.errorMsgVisible = { 'visibility': 'hidden' };
    $scope.successMessage = "Login Successfull!"
    $scope.errorMessage = "Login error"
    $scope.submit = function () {
        var personData =
            {
                Account: $scope.account,
                Password: $scope.password
            }
        $http.post("/api/Persons/LogIn", personData).success(function (data, status, headers, config) {
            $scope.person = data[0];
            $scope.account = $scope.person.PersonId;
            $scope.password = $scope.person.PersonName;
            $scope.successMsgVisible = { 'visibility': 'visible' };
            $scope.errorMsgVisible = { 'visibility': 'hidden' };
        }).error(function (data, status, headers, config) {
            $scope.errorMsgVisible = { 'visibility': 'visible' };
            $scope.successMsgVisible = { 'visibility': 'hidden' };
        });
    }

    $scope.Regigster = function () {
        var personData =
            {
                Account: $scope.RegesterAccount,
                Password: $scope.RegesterPassword,
                PersonName: $scope.RegesterName
            }
        $http.post("/api/Persons/Regester", personData).success(function (data, status, headers, config) {
            $scope.person = data;
            $scope.account = $scope.person.PersonId;
            $scope.password = $scope.person.PersonName;
            $scope.successMsgVisible = { 'visibility': 'visible' };
            $scope.errorMsgVisible = { 'visibility': 'hidden' };
        }).error(function (data, status, headers, config) {
            $scope.errorMsgVisible = { 'visibility': 'visible' };
            $scope.successMsgVisible = { 'visibility': 'hidden' };
        });
    }

    $scope.EditPerson = function () {
        $scope.person.ChildSectionIdList = "1 2";
        $http.post("/api/Persons/EditPerson", $scope.person).success(function (data, status, headers, config) {
            $scope.person = data;
            $scope.account = $scope.person.PersonName;
            $scope.password = $scope.person.ChildSectionIdList;
            $scope.successMsgVisible = { 'visibility': 'visible' };
            $scope.errorMsgVisible = { 'visibility': 'hidden' };
        }).error(function (data, status, headers, config) {
            $scope.errorMsgVisible = { 'visibility': 'visible' };
            $scope.successMsgVisible = { 'visibility': 'hidden' };
        });
    }

})