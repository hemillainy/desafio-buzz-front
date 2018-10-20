angular.module("adminScreen")
    .component("userView", {
        templateUrl: "./src/components/user/user.html",
        controller: function ($scope, usersAPI) {

            $scope.getUserInformations = function () {
                userSearched = usersAPI.getUsers();
                console.log("entrou")
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
        }
    })
