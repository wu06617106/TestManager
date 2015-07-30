'use strict';
var authService = angular.module('authService', []);
authService.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

    var serviceBase = 'http://localhost:4789/api/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };
    //var _person;

    var _saveRegistration = function (registration) {
        _logOut();
        var deferred = $q.defer();

        $http.post(serviceBase + 'Persons/Register', registration).success(function (response) {
            localStorageService.set('authorizationData', { token: 'true', userName: response.PersonName });
            _authentication.isAuth = true;
            _authentication.userName = response.PersonName;

            deferred.resolve(response);

        }).error(function (err, status) {           
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _login = function (loginData) {
        var data = "/?Account="+loginData.account+"&Password="+loginData.password;
        var deferred = $q.defer();

        $http.get(serviceBase + 'Persons/Login' + data).success(function (response) {
            localStorageService.set('authorizationData', { token: 'true', userName: response.PersonName });
            _authentication.isAuth = true;
            _authentication.userName = response.PersonName;
            //_person = response;

            deferred.resolve(response);
        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');
        _authentication.isAuth = false;
        _authentication.userName = "";
    };

    var _fillAuthData = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            //_person = authData.person;
        }
    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);