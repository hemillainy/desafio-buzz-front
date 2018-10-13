angular.module("adminScreen").controller("AdminScreenCtrl", function ($scope) {
    $scope.viewSearch = false;

    $scope.setViewSearch = function () {
        $scope.viewSearch = !$scope.viewSearch;
    }
})