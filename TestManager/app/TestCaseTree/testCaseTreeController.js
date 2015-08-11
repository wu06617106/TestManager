    'use strict';
    
    //controllers
    var testCaseTreeControllers = angular.module('testCaseTreeControllers', ['ui.tree']);
    
    //tree controller
    testCaseTreeControllers.controller('testCaseTreeController', ['$scope', '$modal', '$log', 'testCaseTreeService', '$location', function ($scope, $modal, $log, testCaseTreeService, $location) {

        $scope.sectionsData = [];
        $scope.testCases = [];
        $scope.tree = [];

        //remove section
        $scope.removeSection = function (node) {
            testCaseTreeService.removeSection(node.$modelValue).then(function (response) {
                node.remove();
            },
            function (err) {
            });
        };

        //remove test case
        $scope.removeTestCase = function (node) {
            testCaseTreeService.removeTestCase(node.$modelValue).then(function (response) {
                node.remove();
            },
            function (err) {
            });
        };

        //toggle tree node
        $scope.toggle = function (node) {
            node.toggle();
        };

        $scope.init = function () {
            testCaseTreeService.getTestCases().then(function (response) {
                $scope.testCases = response;
                testCaseTreeService.getSections().then(function (response) {
                    $scope.sectionsData = response;
                    initSectionData();
                },
                function (err) {
                });
            },
            function (err) {
            });
        };

        //initial TestCases
        var initTestCasesData = function (nodeObj) {
            var i;
            for (i = 0; i < $scope.testCases.length; i++) {
                if (nodeObj.node.SectionId == $scope.testCases[i].SectionId) {
                    var testCase = {
                        "TestCaseId": $scope.testCases[i].TestCaseId,
                        "TestCaseTitle": $scope.testCases[i].TestCaseTitle,
                        "SectionId": $scope.testCases[i].SectionId,
                        "TypeId": $scope.testCases[i].TypeId,
                        "PriorityId": $scope.testCases[i].PriorityId,
                        "Estimate": $scope.testCases[i].Estimate,
                        "References": $scope.testCases[i].References,
                        "Preconditions": $scope.testCases[i].Preconditions,
                        "Steps": $scope.testCases[i].Steps,
                        "ExpectedResult": $scope.testCases[i].ExpectedResult
                    };
                    nodeObj.node.testcases.push(testCase);
                }
            }
        };

        // initial Sections
        var initSectionData = function () {
            var i, j;
            for (i = 0; i < $scope.sectionsData.length; i++) {
                var obj = createNodeObj(i);
                var nodes = $scope.sectionsData[i].ChildSectionIdList;
                var splittedNodes;
                if (typeof nodes != 'undefined' && nodes != null && nodes != "") {
                    splittedNodes = nodes.split(" ");
                    for (j = 1; j < splittedNodes.length; j++) {
                        var index = findSectionIndex(splittedNodes[j]);
                        obj.node.nodes.push(createNodeObj(index).node);
                        if ($scope.sectionsData[index].ChildSectionIdList != "") {
                            $scope.sectionsData.splice(index, 1);
                        }
                    }
                }
                initTestCasesData(obj);
                $scope.tree.push(obj.node);  
            }
        };

        //create node object
        var createNodeObj = function (index) {
            var nodeObj = { node: {} };
            nodeObj.node = {
                "SectionId": $scope.sectionsData[index].SectionId,
                "SectionTitle": $scope.sectionsData[index].SectionTitle,
                "SectionDescription": $scope.sectionsData[index].SectionDescription,
                "ParentId": null,
                "ChildSectionIdList": $scope.sectionsData[index].ChildSectionIdList,
                "childs": [],
                "testcases": []
            };
            return nodeObj;
        };

        // find section index by id
        var findSectionIndex = function (id) {
            var i;
            for (i = 0; i < $scope.sectionsData.length; i++) {
                if($scope.sectionsData[i].SectionId == id)
                    return i
            }
        };

        //create new node
        $scope.insertNewNode = function () {
            var length = $scope.tree.length;
            var section = {
                "SectionTitle": "node",
                "SectionDescription": "",
                "ChildSectionIdList": "",
                "childs": [],
                "testcases": []
            };
            testCaseTreeService.createSection(section).then(function (response) {
                $scope.tree.push(response);
            },
            function (err) {
            });
        };

        //edit tree node 
        $scope.editNode = function (node, size) {
            $scope.editNodeData = node.$modelValue;
            $location.path('/TestCase/EditTestCase/' + node.$modelValue.TestCaseId);
        };

        //get test case's detail
        $scope.getNodeDetail = function (node, size) {
            $location.path('/TestCase/TestCasesDetails/' + node.$modelValue.TestCaseId);
        };

        //create new sub node for current tree node
        $scope.newSubItem = function (node) {
            var nodeData = node.$modelValue;
            var section = {
                "SectionTitle": nodeData.SectionTitle + '.' + (nodeData.childs.length + 1),
                "SectionDescription": "",
                "ChildSectionIdList": "",
                "ParentId": nodeData.SectionId,
                "childs": [],
                "testcases": []
            };
            testCaseTreeService.createSection(section).then(function (createResponse) {
                var edit = {
                    "SectionId": nodeData.SectionId,
                    "SectionTitle":nodeData.SectionTitle,
                    "SectionDescription":nodeData.SectionDescription,
                    "ChildSectionIdList": nodeData.ChildSectionIdList + " " + createResponse.SectionId,
                    "ParentId": nodeData.SectionId,
                    "childs": [],
                    "testcases": []
                };
                section.SectionId = createResponse.SectionId;
                nodeData.childs.push(section);
                testCaseTreeService.editSection(edit).then(function (editResponse) {
                    nodeData = editResponse;
                },
                function (err) {
                });
            },
            function (err) {
            });
        };

        //create new input name test case for current tree node
        $scope.newTestCase = function (node) {
            if ($scope.inputTestCase.title.length != 0)
            {
                var nodeData = node.$modelValue;
                var testCase = {
                    "TestCaseTitle": $scope.inputTestCase.title,
                    "SectionId": nodeData.SectionId,
                    "TypeId": 1,
                    "PriorityId": 1,
                    "Estimate": "None",
                    "References": "None",
                    "Preconditions": "None",
                    "Steps": "None",
                    "ExpectedResult": "None"
                };
                testCaseTreeService.createTestCase(testCase).then(function (createResponse) {
                    nodeData.testcases.push(createResponse);
                },
                function (err) {
                });
                $scope.inputTestCase.title = "";
            }
        };

        //edit section title
        $scope.inputSection = { title: "" };
        $scope.editSectionTitle = function (node) {
            if ($scope.inputSection.title.length != 0) {
                node.title = $scope.inputSection.title;
                $scope.closeInputArea();
            }
        };

        //open test case input
        $scope.openInputArea = function (node) {
            $scope.selected = node;
            $scope.isSectionInput.focus = true;
            $scope.isTestCaseInput.focus = true;
        };

        $scope.isNodeSelected = function (node) {
            return $scope.selected === node
        };

        //close test case input
        $scope.closeInputArea = function (node) {
            $scope.selected = "";
        };

        //test case input lost focus
        $scope.inputLostFocus = function () {
            $scope.isSectionInput.focus = false;
            $scope.isTestCaseInput.focus = false;
        };

        // ui tree call back
        $scope.options = {
            accept: function (sourceNode, destNodes, destIndex) {
                var sourceType = sourceNode.$element.attr('data-type');
                var destType = destNodes.$element.attr('data-type');
                return (sourceType == destType); // only accept the same type
            }
        };    
    }]);

    //Edit Node Modal Instance controller
    testCaseTreeControllers.controller('detailNodeModalInstanceCtrl', function ($scope, $modalInstance, detail) {
        $scope.detailNode = detail
        $scope.close = function () {
            $modalInstance.close();
        };
    });

    //Detail Node Modal Instance controller
    testCaseTreeControllers.controller('editNodeModalInstanceCtrl', function ($scope, $modalInstance, detail) {
        $scope.editNodeData = detail;
        //temp types data
        $scope.types = [{
            "id": "0",
            "name": "Acceptance"
        }, {
            "id": "1",
            "name": "Accessibility"
        }, {
            "id": "2",
            "name": "Automated"
        }, {
            "id": "3",
            "name": "Compatibility"
        }, {
            "id": "4",
            "name": "Destructive"
        }, {
            "id": "5",
            "name": "Functional"
        }, {
            "id": "6",
            "name": "Other"
        }, {
            "id": "7",
            "name": "Performance"
        }, {
            "id": "8",
            "name": "Regression"
        }, {
            "id": "9",
            "name": "Security"
        }, {
            "id": "10",
            "name": "Smoke & Sanity"
        }, {
            "id": "11",
            "name": "Usability"
        }];

        $scope.ok = function () {
            if ($scope.editNodeData.title.length != 0) {
                $modalInstance.close($scope.editNodeData);
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }   
 );

