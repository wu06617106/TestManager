(function () {
    'use strict';

    var indexApp = angular.module('treesApp', ['ui.tree', 'ui.bootstrap'])
    .controller('treesCtrl', function ($scope, $modal, $log) {
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
                    "type": "section",
                    "priority": "",
                    "estimate": "",
                    "references": ""
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
                    "type": "section",
                    "priority": "",
                    "estimate": "",
                    "references": ""
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
                controller: 'EditNodeModalInstanceCtrl',
                size: size,
                resolve: {
                    title: function () {
                        return $scope.editNodeData.title;
                    }
                }
            });

            modalInstance.result.then(function (editedNodeData) {
                $scope.editNodeData.title = editedNodeData;
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
                controller: 'DetailNodeModalInstanceCtrl',
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
                type: "section",
                priority: "",
                estimate: "",
                references: ""
            });
        };

        //create new input name test case for current tree node
        $scope.inputTestCase = { title: "" };
        $scope.newTestCase = function (node) {
            if ($scope.inputTestCase.title.length != 0)
            {
                var nodeData = node.$modelValue;
                nodeData.testcases.push({
                    id: nodeData.id * 10 + nodeData.testcases.length,
                    title: $scope.inputTestCase.title,
                    type: "testcase"
                });
                $scope.closeInputArea(node);
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
        };

        $scope.isNodeSelected = function (node) {
            return $scope.selected === node
        };

        //close test case input
        $scope.closeInputArea = function (node) {
            $scope.selected = "";
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
            "type": "section",
            "priority": "",
            "estimate": "",
            "references": "",
            "title": "tree - item1",
            "nodes": [],
            "testcases": []
        }, {
            "id": 2,
            "type": "section",
            "priority": "",
            "estimate": "",
            "references": "",
            "title": "tree - item2",
            "nodes": [],
            "testcases": []
        }, {
            "id": 3,
            "type": "section",
            "priority": "",
            "estimate": "",
            "references": "",
            "title": "tree - item3",
            "nodes": [],
            "testcases": []
        }, {
            "id": 4,
            "type": "section",
            "priority": "",
            "estimate": "",
            "references": "",
            "title": "tree - item4",
            "nodes": [],
            "testcases": []
        }];
    });

    //Edit Node Modal Instance controller
    indexApp.controller('EditNodeModalInstanceCtrl', function ($scope, $modalInstance, title) {
        $scope.editNodeTitle = title;
        $scope.ok = function () {
            if ($scope.editNodeTitle.length != 0) {
                $modalInstance.close($scope.editNodeTitle);
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        
    });

    //Detail Node Modal Instance controller
    indexApp.controller('DetailNodeModalInstanceCtrl', function ($scope, $modalInstance, detail) {
        $scope.detailNode = detail
        $scope.close = function () {
            $modalInstance.close();
        };
    });
})();