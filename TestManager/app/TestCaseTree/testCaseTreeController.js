﻿    'use strict';
    
    //controllers
    var testCaseTreeControllers = angular.module('testCaseTreeControllers', ['ui.tree']);
    
    //tree controller
    testCaseTreeControllers.controller('testCaseTreeController', ['$scope', '$modal', '$log', 'testCaseTreeService', function ($scope, $modal, $log, testCaseTreeService) {

        $scope.sectionsData = [];
        $scope.testCases = [];
        $scope.tree = [];

        //remove tree node
        $scope.remove = function (node) {
            node.remove();
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

        //initail TestCases
        var initTestCasesData = function (nodeObj) {
            var i;
            for (i = 0; i < $scope.testCases.length; i++) {
                if (nodeObj.node.id == $scope.testCases[i].SectionId) {
                    var testCase = {
                        "id": $scope.testCases[i].TestCaseId,
                        "title": $scope.testCases[i].TestCaseTitle,
                        "nodes": [],
                        "testcases": [],
                        "type": { "id": "", "name": "" },
                        "priority": "",
                        "estimate": $scope.testCases[i].Estimate,
                        "references": $scope.testCases[i].References,
                        "preconditions": $scope.testCases[i].Preconditions,
                        "steps": "",
                        "expected_result": ""
                    };
                    nodeObj.node.testcases.push(testCase);
                }
            }
        };

        // initial Sections
        var initSectionData = function () {
            var i;
            for (i = 0; i < $scope.sectionsData.length; i++) {
                var obj = { node: {}};
                obj.node = {
                     "id": $scope.sectionsData[i].SectionId,
                     "title": $scope.sectionsData[i].SectionTitle,
                     "nodes": [],
                     "testcases": [],
                     "type": { "id": "", "name": "" },
                     "priority": "",
                     "estimate": "",
                     "references": "",
                     "preconditions": "",
                     "steps": "",
                     "expected_result": ""
                 };
                initTestCasesData(obj);
                $scope.tree.push(obj.node);  
            }
        };

        //create new node
        $scope.insertNewNode = function () {
            var length = $scope.tree.length;
            if (length == 0) {
                $scope.tree.push({
                    "id": 1,
                    "title": "node",
                    "nodes": [],
                    "testcases": [],
                    "type": { "id": "", "name": "" },
                    "priority": "",
                    "estimate": "",
                    "references": "",
                    "preconditions": "",
                    "steps": "",
                    "expected_result": ""
                });
            }
            else {
                //----------------need to change id's method------------//
                var lastNode = $scope.tree[length - 1];
                $scope.tree.push({
                    "id": lastNode.id + 1,
                    "title": "node",
                    "nodes": [],
                    "testcases": [],
                    "type": { "id": "", "name": "" },
                    "priority": "",
                    "estimate": "",
                    "references": "",
                    "preconditions": "",
                    "steps": "",
                    "expected_result": ""
                });
            }
        };

        //edit tree node 
        $scope.editNodeData;
        $scope.animationsEnabled = true;
        $scope.editNode = function (node, size) {
            $scope.editNodeData = node.$modelValue;
            //new modal instance
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'editNodeModal.html',
                controller: 'editNodeModalInstanceCtrl',
                size: size,
                resolve: {
                    detail: function () {
                        return $scope.editNodeData;
                    }
                }
            });

            modalInstance.result.then(function (result) {
                $scope.editNodeData.title = result.title;
                $scope.editNodeData.type = result.type
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //get test case's detail
        $scope.nodeDetailData;
        $scope.getNodeDetail = function (node, size) {
            $scope.nodeDetailData = node.$modelValue;
            //new modal instance
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'nodeDetailModal.html',
                controller: 'detailNodeModalInstanceCtrl',
                size: size,
                resolve: {
                    detail: function () {
                        return $scope.nodeDetailData;
                    }
                }
            });
        };

        //create new sub node for current tree node
        $scope.newSubItem = function (node) {
            var nodeData = node.$modelValue;
            var node = {
                id: nodeData.id * 10 + nodeData.nodes.length,
                title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                nodes: [],
                testcases: [],
                type: { id: "", name: "" },
                priority: "",
                estimate: "",
                references: "",
                preconditions: "",
                steps: "",
                expected_result: "",
            };
            nodeData.nodes.push(node);
            //testCaseTreeService.createSection(node).then(function (response) {
            //    $scope.sectionsData = response;
            //    initSectionData();
                
            //},
            //function (err) {
            //});
        };

        //create new input name test case for current tree node
        $scope.inputTestCase = { title: "" };
        $scope.isTestCaseInput = { focus: false };
        $scope.isSectionInput = { focus: false };
        $scope.newTestCase = function (node) {
            if ($scope.inputTestCase.title.length != 0)
            {
                var nodeData = node.$modelValue;
                nodeData.testcases.push({
                    id: nodeData.id * 10 + nodeData.testcases.length,
                    title: $scope.inputTestCase.title,
                    type: {id: "", name: ""}
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
        if (detail.type.id != "") {
            $scope.editNodeType = $scope.types[detail.type.id];
        }
        else {
            $scope.editNodeType = $scope.types[0];
        }
        $scope.ok = function () {
            if ($scope.editNodeData.title.length != 0) {
                $scope.editNodeData.type = $scope.editNodeType;
                $modalInstance.close($scope.editNodeData);
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }   
 );

