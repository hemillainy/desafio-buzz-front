angular.module("adminScreen").controller("AdminScreenCtrl", function ($scope) {
    $scope.viewSearch = false;

    $scope.setViewSearch = function () {
        console.log("oi");
        $scope.viewSearch = !$scope.viewSearch;
    }
})