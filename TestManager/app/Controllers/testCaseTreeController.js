    'use strict';
    
    //controllers
    var testCaseTreeControllers = angular.module('testCaseTreeControllers', ['ui.tree']);
    
    //tree controller
    testCaseTreeControllers.controller('testCaseTreeController', ['$scope', '$modal', '$log', 'testApiService', 'testCaseTreeService', '$location', 'authService', function ($scope, $modal, $log, testApiService, testCaseTreeService, $location, authService) {
        $scope.tree = [];
        $scope.sectionsData = [];
        $scope.testCases = [];

        $scope.editNodeData;
        $scope.animationsEnabled = true;
        $scope.nodeDetailData;
        $scope.inputTestCase = { title: "" };
        $scope.isTestCaseInput = { focus: false };
        $scope.isSectionInput = { focus: false };
        $scope.inputSection = { title: "" };

        $scope.authentication = authService.authentication;

        //remove section
        $scope.removeSection = function (node) {
            testApiService.removeSection(node.$modelValue).then(function (response) {
                node.remove();
            },
            function (err) {
            });
        };

        //remove test case
        $scope.removeTestCase = function (node) {
            testApiService.removeTestCase(node.$modelValue).then(function (response) {
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
            testCaseTreeService.init().then(function (response) {
                $scope.tree = testCaseTreeService.tree;
                $scope.sectionsData = testCaseTreeService.sectionsData;
                $scope.testCases = testCaseTreeService.testCases;
            },
            function (err) {
            });;
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
            testApiService.createSection(section).then(function (response) {
                $scope.tree.push(response);
                testCaseTreeService.updateTree($scope.tree);
            },
            function (err) {
            });
        };

        //edit tree node 
        $scope.editNode = function (node, size) {
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
            testApiService.createSection(section).then(function (createResponse) {
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
                testApiService.editSectionChilds(edit).then(function (editResponse) {
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
                    "LastEditPerson": $scope.authentication.userName,
                    "SectionId": nodeData.SectionId,
                    "TypeId": 1,
                    "PriorityId": 1,
                    "Estimate": "None",
                    "References": "None",
                    "Preconditions": "None",
                    "Steps": "None",
                    "ExpectedResult": "None"
                };
                testApiService.createTestCase(testCase).then(function (createResponse) {
                    nodeData.testcases.push(createResponse);

                },
                function (err) {
                });
                $scope.inputTestCase.title = "";
            }
        };

        //edit section title
        $scope.editSectionTitle = function (section) {
            if ($scope.inputSection.title.length != 0) {
                testApiService.editSectionTitle(section, $scope.inputSection.title).then(function (editResponse) {
                    section.SectionTitle = $scope.inputSection.title;
                    $scope.inputSection.title = "";
                    $scope.closeInputArea();
                },
                function (err) {
                });
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

        //update tree when controller be destroyed
        $scope.$on('$destroy', function () { 
            testCaseTreeService.updateTree($scope.tree);
        });
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

