angular.module("adminScreen")
    .factory("usersAPI", function ($http) {
        const _getUsers = function () {
            return $http.get("http://localhost:3000/users");
        };
        return {
            getUsers: _getUsers
        }
    })