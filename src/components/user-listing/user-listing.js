angular.module("adminScreen")
    .component("userListing", {
        templateUrl: './src/components/user-listing/user-listing.html',
        controller: function ($scope, usersAPI) {
            usersAPI.getUsers()
                .then(users => {
                    console.log(users.data)
                    $scope.users = users.data;
                })
        }
    })