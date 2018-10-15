angular.module("adminScreen")
    .component("searchUser", {
        templateUrl: './src/components/search-user/search-user.html',
        controller: function ($scope, usersAPI) {

            let userSearched;

            $scope.searchUser = function () {
                email = document.getElementById("email").value;
                usersAPI.getUsers()
                    .then(users => {
                        user = users.data.filter(a => {
                            if (a.email == email) {
                                return a;
                            }
                        })
                        userSearched = user[0];
                        $scope.userSearched = userSearched;
                    });
            }

            $scope.getUserSettings = function () {
                usersAPI.getSettingsUser(userSearched.id)
                    .then(settings => {

                        $scope.brands_limit = settings.data.brands_limit
                        $scope.collected_limit = settings.data.collected_limit
                        $scope.analytics_limit = settings.data.analytics_limit;
                        $scope.crm_limit = settings.data.crm_limit;

                        setCheckbox(settings);
                    });
            }
            setCheckbox = function (settings) {
                if (settings.data.brands_limited == 1) {
                    document.getElementById("check1").checked = true;
                }
                if (settings.data.collected_limit == 1) {
                    document.getElementById("check2").checked = true;
                }
                if (settings.data.analytics_limit == 1) {
                    document.getElementById("check3").checked = true;
                }
                if (settings.data.crm_limit == 1) {
                    document.getElementById("check4").checked = true;
                }
                if (settings.data.analytics_pro == 1) {
                    document.getElementById("check5").checked = true;
                }
                if (settings.data.dashboards == 1) {
                    document.getElementById("check6").checked = true;
                }
                if (settings.data.historical_search == 1) {
                    document.getElementById("check7").checked = true;
                }
            }
        }
    })