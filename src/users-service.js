angular.module("adminScreen")
    .factory("usersAPI", function ($http) {
        const _getUsers = function () {
            return $http.get("http://localhost:3000/users");
        };

        const _getsUserSetting = function (id) {
            return $http.get("http://localhost:3000/settings/"+id)
        };

        const _getUserInformations = function(id) {
            return $http.get("http://localhost:3000/users/"+id)
        };

        return {
            getUsers: _getUsers,
            getUserSettings: _getUserSettings,
            getUserInformations: _getUserInformations
        }
    })