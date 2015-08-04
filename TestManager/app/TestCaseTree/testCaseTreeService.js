'use strict';

var testCaseTreeService = angular.module('testCaseTreeService', []);

testCaseTreeService.factory('testCaseTreeService', ['$http', '$q', function ($http, $q) {
    var serviceBase = 'http://localhost:4789/api/';
    var testCaseTreeFactory = {};

    var _sectionsData = {};
    var _typesData = {};

    var _getSections = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + 'Sections/GetSections').success(function (response) {
            _sectionsData = response;
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _getTypes = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + 'Types/GetTypes').success(function (response) {
            _typesData = response;
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    testCaseTreeFactory.getSections = _getSections;
    return testCaseTreeFactory;
}]);