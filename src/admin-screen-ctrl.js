angular.module("adminScreen").controller("AdminScreenCtrl", function ($scope) {
    $scope.viewSearch = false;
    $scope.viewUserListing = false;

    $scope.setViewSearch = function (operation) {
        if (!$scope.viewSearch) {
            $scope.viewSearch = operation;
        } else {
            $scope.viewSearch = !$scope.viewSearch;
        }
    }

    $scope.setViewUserListing = function (operation) {
        if (!$scope.viewUserListing) {
            $scope.viewUserListing = operation;
        } else {
            $scope.viewUserListing = !$scope.viewUserListing;
        }
    }
})