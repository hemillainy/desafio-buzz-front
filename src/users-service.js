angular.module("adminScreen")
    .factory("usersAPI", function ($http) {
        const _getUsers = function () {
            return $http.get("https://api-desafio.herokuapp.com/users");
        };

        const _getUserSettings = function (id) {
            return $http.get("https://api-desafio.herokuapp.com/settings/" + id)
        };

        const _getUserInformations = function (id) {
            return $http.get("https://api-desafio.herokuapp.com/users/" + id)
        };

        const _getProjects = function () {
            return $http.get("https://api-desafio.herokuapp.com/projects");
        }

        const _save = function (id, email, password, total_quota, activation_state, account_type) {
            updatedUser = {	
                "id": id,
                "email": email,
                "password": password,
                "total_quota": total_quota,
                "activation_state": activation_state,
                "account_type": account_type
            }
            console.log(updatedUser)
            return $http.put("https://api-desafio.herokuapp.com/users/" + id, updatedUser);
        }

        return {
            getUsers: _getUsers,
            getUserSettings: _getUserSettings,
            getUserInformations: _getUserInformations,
            getProjects: _getProjects,
            save: _save
        }
    })