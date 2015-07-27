(function () {
    'use strict';
    
    //controllers
    var controllers = angular.module('controllers', []);

    //tree controller
    controllers.controller('treesCtrl', function ($scope, $modal, $log) {
        //remove tree node
        $scope.remove = function (node) {
            node.remove();
        };

        //toggle tree node
        $scope.toggle = function (node) {
            node.toggle();
        };

        //create new tree
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
            nodeData.nodes.push({
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
            });
        };

        //create new input name test case for current tree node
        $scope.inputTestCase = { title: "" };
        $scope.isTestCaseInput = { focus: false };
        $scope.newTestCase = function (node) {
            if ($scope.inputTestCase.title.length != 0)
            {
                var nodeData = node.$modelValue;
                nodeData.testcases.push({
                    id: nodeData.id * 10 + nodeData.testcases.length,
                    title: $scope.inputTestCase.title,
                    type: {id: "", name: ""}
                });
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

        //temp tree data
        $scope.tree = [{
            "id": 1,
            "type": { "id": "", "name": "" },
            "priority": "",
            "estimate": "",
            "references": "",
            "preconditions": "",
            "steps": "",
            "expected_result": "",
            "title": "tree - item1",
            "nodes": [],
            "testcases": []
        }, {
            "id": 2,
            "type": { "id": "", "name": "" },
            "priority": "",
            "estimate": "",
            "references": "",
            "preconditions": "",
            "steps": "",
            "expected_result": "",
            "title": "tree - item2",
            "nodes": [],
            "testcases": []
        }, {
            "id": 3,
            "type": { "id": "", "name": "" },
            "priority": "",
            "estimate": "",
            "references": "",
            "preconditions": "",
            "steps": "",
            "expected_result": "",
            "title": "tree - item3",
            "nodes": [],
            "testcases": []
        }, {
            "id": 4,
            "type": { "id": "", "name": "" },
            "priority": "",
            "estimate": "",
            "references": "",
            "preconditions": "",
            "steps": "",
            "expected_result": "",
            "title": "tree - item4",
            "nodes": [],
            "testcases": []
        }];
    });

    //Edit Node Modal Instance controller
    controllers.controller('detailNodeModalInstanceCtrl', function ($scope, $modalInstance, detail) {
        $scope.detailNode = detail
        $scope.close = function () {
            $modalInstance.close();
        };
    });

    //Detail Node Modal Instance controller
    controllers.controller('editNodeModalInstanceCtrl', function ($scope, $modalInstance, detail) {
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
    });

    var directives = angular.module('directives', []);

    directives.directive('ngFocus', function ($timeout) {
        return {
            link: function (scope, element, attrs) {
                scope.$watch(attrs.ngFocus, function (val) {
                    if (angular.isDefined(val) && val) {
                        $timeout(function () { element[0].focus(); });
                    }
                }, true);
                element.bind('blur', function () {
                    if (angular.isDefined(attrs.ngFocusLost)) {
                        scope.$apply(attrs.ngFocusLost);
                    }
                });
            }
        };
    });

    //module
    var indexApp = angular.module('treesApp', ['ui.tree', 'ui.bootstrap', 'controllers', 'directives'])
})();