'use strict';
var tabControllers = angular.module('tabControllers', []);
tabControllers.controller('tabController', ['$scope', '$location', 'authService', '$timeout', function ($scope, $location, authService, $timeout) {
    $scope.authentication = authService.authentication;

    $scope.redirectToTestCase = function () {
        $location.path('/TestCase/Index');
    };

    $scope.redirectToTestPlan = function () {
        $location.path('/TestPlan/AddTestPlan');
    };
}]);
