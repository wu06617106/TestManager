'use strict';

var testApiService = angular.module('testApiService', []);

testApiService.factory('testApiService', ['$http', '$q', function ($http, $q) {
    var serviceBase = 'http://localhost:4789/api/';
    var testApiFactory = {};

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

    var _editSectionChilds = function (section) {
        var deferred = $q.defer();
        $http.put(serviceBase + 'Sections/EditSectionChild' + '?id=' + section.SectionId + '&childIdString=' + section.ChildSectionIdList).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _editSectionTitle = function (section, title) {
        var deferred = $q.defer();
        $http.put(serviceBase + 'Sections/EditSectionTitle' + '?id=' + section.SectionId + '&sectionTitle=' + title).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    testApiFactory.getSections = _getSections;
    testApiFactory.getTypes = _getTypes;
    testApiFactory.getTestCases = _getTestCases;
    testApiFactory.createSection = _createSection;
    testApiFactory.createTestCase = _createTestCase;
    testApiFactory.editSectionChilds = _editSectionChilds;
    testApiFactory.editSectionTitle = _editSectionTitle;
    testApiFactory.removeTestCase = _removeTestCase;
    testApiFactory.removeSection = _removeSection;
    return testApiFactory;
}]);