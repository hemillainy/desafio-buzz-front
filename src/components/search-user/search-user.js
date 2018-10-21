angular.module("adminScreen")
    .component("searchUser", {
        templateUrl: './src/components/search-user/search-user.html',
        controller: function ($scope, usersAPI) {

            let userSearched;
            $scope.viewSettings = false;
            $scope.viewUserInformations = false;
            $scope.viewStats = false;
            $scope.viewTabs = false;
            $scope.passwordSco = "";

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

            $scope.getStats = function () {
                usersAPI.getUserInformations(userSearched.id)
                    .then(userInfos => {
                        document.getElementById("totalQuota").value = userInfos.data.total_quota;
                        $total = userInfos.data.total_quota;
                        getProjectsInformations();
                    })
            }

            getProjectsInformations = function () {
                usersAPI.getProjects()
                    .then(projects => {
                        projects = projects.data.filter(a => {
                            if (a.user_id == userSearched.id) {
                                return a.quota_used;
                            }
                        });
                        $scope.projects = projects.sort((a, b) => {
                            return b.quota_used - a.quota_used;
                        });
                        console.log($scope.projects)
                    })
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
                    })
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

            $scope.setViews = function (tab1, tab2, tab3) {
                $scope.viewUserInformations = tab1;
                $scope.viewSettings = tab2;
                $scope.viewStats = tab3;
            }

            setViewUserInformations = function (operation) {
                if (!$scope.viewUserInformations) {
                    $scope.viewUserInformations = operation;
                } else {
                    $scope.viewUserInformations = true;
                }
            }

            $scope.setViewUserInformations = setViewUserInformations;

            $scope.setViewTabs = function () {
                $scope.viewTabs = true;
            }

            $scope.save = function () {
                id = userSearched.id;
                email = userSearched.email;
                if (document.getElementById("password") !== null) {
                    password = document.getElementById("password").value;
                } else {
                    password = userSearched.password;
                }
                if (document.getElementById("totalQuota") !== null) {
                    total_quota = document.getElementById("totalQuota").value;
                } else {
                    total_quota = userSearched.total_quota;
                }
                activation_state = userSearched.activation_state;
                account_type = userSearched.account_type;
                usersAPI.save(id, email, password, total_quota, activation_state, account_type);
            }

            $scope.quotaInformation = function () {
                usersAPI.getProjects()
                    .then(projects => {
                        let quotaUsed = 0;
                        for (let i = 0; i < projects.data.length; i++) {
                            quotaUsed += projects.data[i].quota_used;
                        }

                        $scope.currentQuota = userSearched.total_quota - quotaUsed;
                        $scope.quotaUsed = quotaUsed;
                    });
            }

            // perc = 

            $scope.perc = function (used) {
                return ((used / userSearched.total_quota) * 100).toFixed(2);
            }
        }
    })