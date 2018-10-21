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

        const _updateUser = function (id, email, password, total_quota, activation_state, account_type) {
            updatedUser = {
                "id": id,
                "email": email,
                "password": password,
                "total_quota": total_quota,
                "activation_state": activation_state,
                "account_type": account_type
            }
            return $http.put("https://api-desafio.herokuapp.com/users/" + id, updatedUser);
        }

        const _updateSetting = function (id, brands_limit, collected_limit, analytics_profile_limit, crm_profile_limit, brands_limited, collected_limited, analytics_profile_limited, crm_profile_limited, analytics_pro, dashboards, historial_search, userId) {
            updatedSetting = {
                "id": id,
                "brands_limit": brands_limit,
                "brands_limited": brands_limited,
                "collected_limit": collected_limit,
                "collected_limited": collected_limited,
                "analytics_limit": analytics_profile_limit,
                "analytics_limited": analytics_profile_limited,
                "crm_limit": crm_profile_limit,
                "crm_limited": crm_profile_limited,
                "analytics_pro": analytics_pro,
                "dashboards": dashboards,
                "historial_search": historial_search,
                "user_id": userId
            }
            return $http.put("https://api-desafio.herokuapp.com/settings/" + id, updatedSetting);
        }

        return {
            getUsers: _getUsers,
            getUserSettings: _getUserSettings,
            getUserInformations: _getUserInformations,
            getProjects: _getProjects,
            updateUser: _updateUser,
            updateSetting: _updateSetting
        }
    })