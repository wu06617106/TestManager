'use strict';

var testCaseTreeService = angular.module('testCaseTreeService', []);

testCaseTreeService.factory('testCaseTreeService', ['$http', '$q', function ($http, $q) {
    var serviceBase = 'http://localhost:4789/api/';
    var testCaseTreeFactory = {};


    //Get sections api from web api
    var _getSections = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + 'Sections/GetSections').success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    //Get types from web api
    var _getTypes = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + 'Types/GetTypes').success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    //Get test cases from web api
    var _getTestCases = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + 'TestCases/GetTestCases').success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    //Create section
    var _createSection = function (section) {
        var deferred = $q.defer();
        $http.post(serviceBase + 'Sections/CreateSection', section).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

<<<<<<< HEAD
    var _removeSection = function (node) {
        var deferred = $q.defer();
        $http.delete(serviceBase + 'Sections/DeleteSectionTree/' + node.id).success(function (response) {
=======
    //Create test case
    var _createTestCase = function (testCase) {
        var deferred = $q.defer();
        $http.post(serviceBase + 'TestCases/CreateTestCase', testCase).success(function (response) {
>>>>>>> 2d9b43f75dead656324af90e4af4df20b2281c58
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

<<<<<<< HEAD
    var _removeTestCase = function (node) {
=======
    //Remove test case
    var _removeTestCase = function (testCase) {
>>>>>>> 2d9b43f75dead656324af90e4af4df20b2281c58
        var deferred = $q.defer();
        $http.delete(serviceBase + 'TestCases/DeleteTestCase/' + testCase.id).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    //Edit section
    var _editSection = function (section) {
        var deferred = $q.defer();
        $http.put(serviceBase + 'Sections/EditSectionChild' + '?id=' + section.SectionId + '&childIdString=' + section.ChildSectionIdList).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    //Edit section title
    var _editSectionTitle = function (id, title) {
        var deferred = $q.defer();
        $http.put(serviceBase + 'Sections/EditSectionTitle' + '?id=' + id + '&sectionTitle=' + title).success(function (response) {
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
    testCaseTreeFactory.editSectionTitle = _editSectionTitle;
    testCaseTreeFactory.removeTestCase = _removeTestCase;
    testCaseTreeFactory.removeSection = _removeSection;
    return testCaseTreeFactory;
}]);