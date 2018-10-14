angular.module("adminScreen").controller("AdminScreenCtrl", function ($scope) {
    $scope.viewSearch = false;
    $scope.viewUserListing = false;

    $scope.setViewSearch = function () {
        $scope.viewSearch = !$scope.viewSearch;
    }

    $scope.setViewUserListing = function () {
        $scope.viewUserListing = !$scope.viewUserListing;
    }
})