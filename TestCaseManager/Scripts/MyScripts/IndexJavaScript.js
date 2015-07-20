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
        $scope.createNewTree = function () {
            if ($scope.tree.length == 0)
            {
                $scope.tree.push({"id":1,"title":"node","nodes":[]})
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
                nodes: []
            });
        };

        //temp tree data
        $scope.tree = [{
            "id": 1,
            "title": "tree - item1",
            "nodes": [],
        }, {
            "id": 2,
            "title": "tree - item2",
            "nodes": [],
        }, {
            "id": 3,
            "title": "tree - item3",
            "nodes": [],
        }, {
            "id": 4,
            "title": "tree - item4",
            "nodes": [],
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