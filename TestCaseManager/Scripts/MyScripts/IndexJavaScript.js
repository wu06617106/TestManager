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

        //edit tree node 
        $scope.editNodeData;
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;
        $scope.editNode = function (node, size) {
            $scope.editNodeData = node.$modelValue;
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'nodeContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
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
        $scope.tree1 = [{
            "id": 1,
            "title": "tree1 - item1",
            "nodes": [],
        }, {
            "id": 2,
            "title": "tree1 - item2",
            "nodes": [],
        }, {
            "id": 3,
            "title": "tree1 - item3",
            "nodes": [],
        }, {
            "id": 4,
            "title": "tree1 - item4",
            "nodes": [],
        }];
    });

    //Modal Instance controller
    indexApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
})();