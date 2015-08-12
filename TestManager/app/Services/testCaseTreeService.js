'use strict';

var testCaseTreeService = angular.module('testCaseTreeService', []);

testCaseTreeService.factory('testCaseTreeService', ['$http', '$q', 'testApiService', function ($http, $q, testApiService) {
    var _tree = [];
    var _sectionsData = [];
    var _testCases = [];

    var testCaseTreeFactory = {};
    testCaseTreeFactory.tree = _tree;
    testCaseTreeFactory.sectionsData = _sectionsData;
    testCaseTreeFactory.testCases = _testCases;

    // build the tree
    var _init = function () {
        var deferred = $q.defer();
        testApiService.getTestCases().then(function (response) {
            testCaseTreeFactory.testCases = response;
            testApiService.getSections().then(function (response) {
                testCaseTreeFactory.sectionsData = response;
                initSectionData();
                deferred.resolve(response);
            },
            function (err) {
                deferred.reject(err);
            });
        },
        function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    // update tree data
    var _updateTree = function (tree) {
        testCaseTreeFactory.tree = tree;
    };

    //initial TestCases
    var initTestCasesData = function (nodeObj) {
        var i;
        for (i = 0; i < testCaseTreeFactory.testCases.length; i++) {
            if (nodeObj.node.SectionId == testCaseTreeFactory.testCases[i].SectionId) {
                var testCase = {
                    "TestCaseId": testCaseTreeFactory.testCases[i].TestCaseId,
                    "TestCaseTitle": testCaseTreeFactory.testCases[i].TestCaseTitle,
                    "LastEditPerson": testCaseTreeFactory.testCases[i].LastEditPerson,
                    "SectionId": testCaseTreeFactory.testCases[i].SectionId,
                    "TypeId": testCaseTreeFactory.testCases[i].TypeId,
                    "PriorityId": testCaseTreeFactory.testCases[i].PriorityId,
                    "Estimate": testCaseTreeFactory.testCases[i].Estimate,
                    "References": testCaseTreeFactory.testCases[i].References,
                    "Preconditions": testCaseTreeFactory.testCases[i].Preconditions,
                    "Steps": testCaseTreeFactory.testCases[i].Steps,
                    "ExpectedResult": testCaseTreeFactory.testCases[i].ExpectedResult
                };
                nodeObj.node.testcases.push(testCase);
            }
        }
    };

    // initial Sections
    var initSectionData = function () {
        var i, j;
        for (i = 0; i < testCaseTreeFactory.sectionsData.length; i++) {
            var obj = createNodeObj(i);
            var childs = testCaseTreeFactory.sectionsData[i].ChildSectionIdList;
            insertSectionChilds(childs, obj);
            initTestCasesData(obj);
            testCaseTreeFactory.tree.push(obj.node);
        }
    };

    var insertSectionChilds = function (childs, obj) {
        var splittedNodes, j;
        if (typeof childs != 'undefined' && childs != null && childs != "") {
            splittedNodes = childs.split(" ");
            for (j = 1; j < splittedNodes.length; j++) {
                var index = findSectionIndex(splittedNodes[j]);
                var child = createNodeObj(index);
                obj.node.childs.push(child.node);
                child.node.ParentId = obj.node.SectionId;
                if (testCaseTreeFactory.sectionsData[index].ChildSectionIdList != "") {
                    insertSectionChilds(testCaseTreeFactory.sectionsData[index].ChildSectionIdList, child);
                }
                testCaseTreeFactory.sectionsData.splice(index, 1);
            }
        }
    };

    //create node object
    var createNodeObj = function (index) {
        var nodeObj = { node: {} };
        nodeObj.node = {
            "SectionId": testCaseTreeFactory.sectionsData[index].SectionId,
            "SectionTitle": testCaseTreeFactory.sectionsData[index].SectionTitle,
            "SectionDescription": testCaseTreeFactory.sectionsData[index].SectionDescription,
            "ParentId": null,
            "ChildSectionIdList": testCaseTreeFactory.sectionsData[index].ChildSectionIdList,
            "childs": [],
            "testcases": []
        };
        return nodeObj;
    };

    // find section index by id
    var findSectionIndex = function (id) {
        var i;
        for (i = 0; i < testCaseTreeFactory.sectionsData.length; i++) {
            if (testCaseTreeFactory.sectionsData[i].SectionId == id)
                return i
        }
    };

    testCaseTreeFactory.init = _init;
    testCaseTreeFactory.updateTree = _updateTree;
    return testCaseTreeFactory;
}]);