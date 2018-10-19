angular.module("adminScreen")
    .factory("usersAPI", function ($http) {
        const _getUsers = function () {
            return $http.get("https://api-desafio.herokuapp.com/users");
        };

        const _getUserSettings = function (id) {
            return $http.get("https://api-desafio.herokuapp.com/settings" + id)
        };

        const _getUserInformations = function (id) {
            return $http.get("https://api-desafio.herokuapp.com/users" + id)
        };

        const _getProjectsInformations = function (id) {
            return $http.get("http://localhost:3000/projects" + id);
        }

        return {
            getUsers: _getUsers,
            getUserSettings: _getUserSettings,
            getUserInformations: _getUserInformations,
            getProjectsInformations: _getProjectsInformations
        }
    })