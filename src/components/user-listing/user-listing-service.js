angular.module("adminScreen")
    .factory("usersAPI", function ($http) {
        const getUsers = function () {
            return $http.get("http://localhost:3000/users")
        }
    })