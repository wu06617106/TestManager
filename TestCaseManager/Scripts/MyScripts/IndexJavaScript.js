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
                $scope.tree.push({ "id": 1, "title": "node", "nodes": [] });
            }
            else {
                //----------------need to change id's method------------//
                var lastNode = $scope.tree[length - 1];
                $scope.tree.push({ "id": lastNode.id + 1, "title": "node", "nodes": [] });
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
                templateUrl: 'nodeContent.html',
                controller: 'ModalInstanceCtrl',
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

        //create new sub node for current tree node
        $scope.newSubItem = function (node) {
            var nodeData = node.$modelValue;
            nodeData.nodes.push({
                id: nodeData.id * 10 + nodeData.nodes.length,
                title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                nodes: [],
                testcases: []
            });
        };
        //create new test case for current tree node
        $scope.newTestCase = function (node) {
            var nodeData = node.$modelValue;
            nodeData.testcases.push({
                id: nodeData.id * 10 + nodeData.testcases.length,
                title: nodeData.title + '.' + (nodeData.testcases.length + 1),
            });
        };

        //create new input name test case for current tree node
        $scope.inputTestCase = {title:""};
        $scope.newInutNameTestCase = function (node) {
            var nodeData = node.$modelValue;
            nodeData.testcases.push({
                id: nodeData.id * 10 + nodeData.testcases.length,
                title: $scope.inputTestCase.title,
            });
        };

        //open test case input
        
        $scope.openInputTestCase = function (node) {
            $scope.selected = node;
        };


        $scope.isNodeSelected = function (node) {
            return $scope.selected === node
        };

        //close test case input
        $scope.closeInputTestCase = function (node) {
            $scope.selected = "";
        };

        //temp tree data
        $scope.tree = [{
            "id": 1,
            "title": "tree - item1",
            "nodes": [],
            "testcases": []
        }, {
            "id": 2,
            "title": "tree - item2",
            "nodes": [],
            "testcases": []
        }, {
            "id": 3,
            "title": "tree - item3",
            "nodes": [],
            "testcases": []
        }, {
            "id": 4,
            "title": "tree - item4",
            "nodes": [],
            "testcases": []
        }];
    });

    //Modal Instance controller
    indexApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, title) {
        $scope.editNodeTitle = title;
        $scope.ok = function () {
            $modalInstance.close($scope.editNodeTitle);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
})();