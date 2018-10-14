angular.module("adminScreen")
    .factory("usersAPI", function ($http) {
        const _getUsers = function () {
            return $http.get("http://localhost:3000/users");
        };

        const _getSettingsUser = function (id) {
            return $http.get("http://localhost:3000/settings/"+id)
        }

        return {
            getUsers: _getUsers,
            getSettingsUser: _getSettingsUser
        }
    })