'use strict';

var testCaseTreeService = angular.module('testCaseTreeService', []);

testCaseTreeService.factory('testCaseTreeService', ['$http', '$q', function ($http, $q) {
    var serviceBase = 'http://localhost:4789/api/';
    var testCaseTreeFactory = {};

    var _sectionData = {};
    
    var _getSection = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + 'Sections/GetSections').success(function (response) {
            _sectionData = response;
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    testCaseTreeFactory.getSection = _getSection;
    return testCaseTreeFactory;
}]);