'use strict';
var addTestPlanControllers = angular.module('addTestPlanControllers', []);
addTestPlanControllers.controller('addTestPlanController', ['$scope', 'testCaseTreeService', function ($scope, testCaseTreeService) {
    $scope.tree = [];

    $scope.init = function () {
        $scope.tree = testCaseTreeService.getTree();
    };
}]);

