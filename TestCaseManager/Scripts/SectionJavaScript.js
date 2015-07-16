var SectionModual = angular.module("SectionModual", []);
SectionModual.controller("SectionCTRL", function ($scope, $http) {
    $scope.title;
    $scope.description;
    $scope.section;

    $scope.successMsgVisible = { 'visibility': 'hidden' };
    $scope.errorMsgVisible = { 'visibility': 'hidden' };
    $scope.successMessage = "Login Successfull!"
    $scope.errorMessage = "Login error"

    $scope.submit = function () {
        var sectionData =
            {
                SectionTitle: $scope.title,
                SectionDescription: $scope.description
            }
        $http.post("/api/Sections/CreateSection", sectionData).success(function (data, status, headers, config) {
            $scope.section = data;
            $scope.title = $scope.section.SectionTitle;
            $scope.description = $scope.section.SectionDescription;
            $scope.successMsgVisible = { 'visibility': 'visible' };
            $scope.errorMsgVisible = { 'visibility': 'hidden' };
        }).error(function (data, status, headers, config) {
            $scope.errorMsgVisible = { 'visibility': 'visible' };
            $scope.successMsgVisible = { 'visibility': 'hidden' };
        });
    }

    $scope.GetSection = function () {
        $http.get("/api/Sections/GetSection/3").success(function (data, status, headers, config) {
            $scope.section = data;
            $scope.title = $scope.section.SectionTitle;
            $scope.description = $scope.section.SectionDescription;
            $scope.successMsgVisible = { 'visibility': 'visible' };
            $scope.errorMsgVisible = { 'visibility': 'hidden' };
        }).error(function (data, status, headers, config) {
            $scope.errorMsgVisible = { 'visibility': 'visible' };
            $scope.successMsgVisible = { 'visibility': 'hidden' };
        });
    }

    $scope.EditSection = function () {
        $scope.section.ChildSectionIdList = "1 2"
        $http.post("/api/Sections/EditSection", $scope.section).success(function (data, status, headers, config) {
            $scope.section = data;
            $scope.title = $scope.section.SectionTitle;
            $scope.description = $scope.section.ChildSectionIdList;
            $scope.successMsgVisible = { 'visibility': 'visible' };
            $scope.errorMsgVisible = { 'visibility': 'hidden' };
        }).error(function (data, status, headers, config) {
            $scope.errorMsgVisible = { 'visibility': 'visible' };
            $scope.successMsgVisible = { 'visibility': 'hidden' };
        });
    }
}) 