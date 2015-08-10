'use strict';

var testCaseTreeService = angular.module('testCaseTreeService', []);

testCaseTreeService.factory('testCaseTreeService', ['$http', '$q', function ($http, $q) {
    var serviceBase = 'http://localhost:4789/api/';
    var testCaseTreeFactory = {};

    var _getSections = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + 'Sections/GetSections').success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _getTypes = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + 'Types/GetTypes').success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _getTestCases = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + 'TestCases/GetTestCases').success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _createSection = function (section) {
        var deferred = $q.defer();
        $http.post(serviceBase + 'Sections/CreateSection', section).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _createTestCase = function (testCase) {
        var deferred = $q.defer();
        $http.post(serviceBase + 'TestCases/CreateTestCase', testCase).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _removeSection = function (node) {
        var deferred = $q.defer();
        $http.delete(serviceBase + 'Sections/DeleteSectionTree/' + node.SectionId).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _removeTestCase = function (node) {
        var deferred = $q.defer();
        $http.delete(serviceBase + 'TestCases/DeleteTestCase/' + node.TestCaseId).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _editSection = function (section) {
        var deferred = $q.defer();
        $http.put(serviceBase + 'Sections/EditSectionChild' + '?id=' + section.SectionId + '&childIdString=' + section.ChildSectionIdList).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    testCaseTreeFactory.getSections = _getSections;
    testCaseTreeFactory.getTypes = _getTypes;
    testCaseTreeFactory.getTestCases = _getTestCases;
    testCaseTreeFactory.createSection = _createSection;
    testCaseTreeFactory.createTestCase = _createTestCase;
    testCaseTreeFactory.editSection = _editSection;
    testCaseTreeFactory.removeTestCase = _removeTestCase;
    testCaseTreeFactory.removeSection = _removeSection;
    return testCaseTreeFactory;
}]);