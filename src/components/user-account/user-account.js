angular.module("adminScreen")
    .component("userAccount", {
        templateUrl: './src/components/user-account/user-account.html',
        controller: function ($scope, usersAPI) {

            let userSearched;
            let idSettings;
            let totalQuota;
            $scope.viewSettings = false;
            $scope.viewUserInformations = false;
            $scope.viewStats = false;
            $scope.viewTabs = false;
            $scope.passwordSco = "";

            $scope.searchUser = function (viewUser) {
                email = document.getElementById("email").value;
                usersAPI.getUsers()
                    .then(users => {
                        user = users.data.filter(a => {
                            if (a.email == email) {
                                return a;
                            }
                        })
                        userSearched = user[0];
                        totalQuota = userSearched.total_quota;
                        $scope.userSearched = userSearched;
                        getUserInformations(viewUser);
                    });
            }

            $scope.getUserSettings = function () {
                usersAPI.getUserSettings(userSearched.id)
                    .then(settings => {
                        if (settings.data.brands_limited) {
                            document.getElementById("brand_limit").value = settings.data.brands_limit;
                        }
                        if (settings.data.collected_limited) {
                            document.getElementById("collected_posts_limit").value = settings.data.collected_limit
                        }
                        if (settings.data.analytics_limited) {
                            document.getElementById("analytics_profile_limit").value = settings.data.analytics_limit;
                        }
                        if (settings.data.crm_limited) {
                            document.getElementById("crm_profile_limit").value = settings.data.crm_limit;
                        }

                        idSettings = settings.data.id;
                        setCheckbox(settings.data);
                    });
            }

            $scope.getStats = function () {
                usersAPI.getUserInformations(userSearched.id)
                    .then(userInfos => {
                        document.getElementById("totalQuota").value = totalQuota;
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
                    })
            }

            getUserInformations = function (viewUser) {
                usersAPI.getUserInformations(userSearched.id)
                    .then(userInfos => {
                        setViewUserInformations(viewUser);
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
                if ($scope.viewUserInformations || $scope.viewStats) {
                    updateUser();
                } else if ($scope.viewSettings) {
                    updateSetting();
                }
            }

            updateUser = function () {
                id = userSearched.id;
                email = userSearched.email;
                if (document.getElementById("password") !== null) {
                    password = document.getElementById("password").value;
                } else {
                    password = userSearched.password;
                }
                if ($scope.viewStats) {
                    total_quota = parseInt(document.getElementById("totalQuota").value);
                } else {
                    total_quota = userSearched.total_quota;
                }
                console.log(total_quota);
                activation_state = userSearched.activation_state;
                account_type = userSearched.account_type;
                usersAPI.updateUser(id, email, password, total_quota, activation_state, account_type);


            }

            updateSetting = function () {
                if (document.getElementById("brand_limit").value != "") {
                    brands_limit = parseInt(document.getElementById("brand_limit").value);
                } else {
                    brands_limit = 0;
                }
                if (document.getElementById("collected_posts_limit").value != "") {
                    collected_limit = parseInt(document.getElementById("collected_posts_limit").value);
                } else {
                    collected_limit = 0;
                } if (document.getElementById("analytics_profile_limit").value != "") {
                    analytics_profile_limit = parseInt(document.getElementById("analytics_profile_limit").value);
                } else {
                    analytics_profile_limit = 0;
                }
                if (document.getElementById("crm_profile_limit").value != "") {
                    crm_profile_limit = parseInt(document.getElementById("crm_profile_limit").value);
                } else {
                    crm_profile_limit = 0;
                }
                brands_limited = document.getElementById("check1").checked;
                collected_limited = document.getElementById("check2").checked;
                analytics_profile_limited = document.getElementById("check3").checked;
                crm_profile_limited = document.getElementById("check4").checked;
                analytics_pro = document.getElementById("check5").checked;
                dashboards = document.getElementById("check6").checked;
                historial_search = document.getElementById("check7").checked;
                userId = userSearched.id;

                usersAPI.updateSetting(idSettings, brands_limit, collected_limit, analytics_profile_limit, crm_profile_limit, brands_limited, collected_limited, analytics_profile_limited, crm_profile_limited, analytics_pro, dashboards, historial_search, userId);
            }

            $scope.quotaInformation = function () {
                usersAPI.getProjects()
                    .then(projects => {
                        let quotaUsed = 0;
                        for (let i = 0; i < projects.data.length; i++) {
                            quotaUsed += projects.data[i].quota_used;
                        }

                        $scope.currentQuota = totalQuota - quotaUsed;
                        $scope.quotaUsed = quotaUsed;
                    });
            }

            $scope.perc = function (used) {
                return ((used / userSearched.total_quota) * 100).toFixed(2);
            }
        }
    })
