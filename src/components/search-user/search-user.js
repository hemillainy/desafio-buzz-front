angular.module("adminScreen")
    .component("searchUser", {
        templateUrl: './src/components/search-user/search-user.html',
        controller: function ($scope, usersAPI) {

            let userSearched;
            $scope.viewSettings = false;
            $scope.viewUserInformations = false;
            $scope.viewStats = false;

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
                        getUserInformations();
                    });
            }

            $scope.getUserSettings = function () {
                usersAPI.getUserSettings(userSearched.id)
                    .then(settings => {
                        $scope.brands_limit = settings.data.brands_limit
                        $scope.collected_limit = settings.data.collected_limit
                        $scope.analytics_limit = settings.data.analytics_limit;
                        $scope.crm_limit = settings.data.crm_limit;

                        setCheckbox(settings.data);
                    });
            }
            getUserInformations = function () {
                usersAPI.getUserInformations(userSearched.id)
                    .then(userInfos => {
                        setViewUserInformations(true);
                        $scope.userEmail = userInfos.data.email;
                        $scope.userPassword = userInfos.data.password;
                        $scope.activationState = userInfos.data.activation_state;
                        $scope.accountType = userInfos.data.account_type;
                        $scope.userInfos = userInfos.data;
                        document.getElementById("totalQuota").value = userInfos.data.total_quota;
                    })
            }

            getProjectsInformations = function () {
                usersAPI.getProjectsInformations(userSearched.id)
                    .then()
            }

            setCheckbox = function (settings) {
                if (settings.brands_limited) {
                    document.getElementById("check1").checked = true;
                }
                if (settings.collected_limited) {
                    document.getElementById("check2").checked = true;
                }
                if (settings.analytics_limited) {
                    document.getElementById("check3").checked = true;
                }
                if (settings.crm_limited) {
                    document.getElementById("check4").checked = true;
                }
                if (settings.analytics_pro) {
                    document.getElementById("check5").checked = true;
                }
                if (settings.dashboards) {
                    document.getElementById("check6").checked = true;
                }
                if (settings.historial_search) {
                    document.getElementById("check7").checked = true;
                }
            }

            $scope.setViewSettings = function (operation) {
                if (!$scope.viewSettings) {
                    $scope.viewSettings = operation;
                } else {
                    $scope.viewSettings = !$scope.viewSettings;
                }
            }

            setViewUserInformations = function (operation) {
                if (!$scope.viewUserInformations) {
                    $scope.viewUserInformations = operation;
                } else {
                    $scope.viewUserInformations = !$scope.viewUserInformations;
                }
            }

            $scope.setViewUserInformations = setViewUserInformations;

            $scope.setViewStats = function (operation) {
                if (!$scope.viewStats) {
                    $scope.viewStats = operation;
                } else {
                    $scope.viewStats = !$scope.viewStats;
                }
            }


        }
    })