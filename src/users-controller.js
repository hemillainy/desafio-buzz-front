angular.module("adminScreen")
    .controller("userCtlr", function (usersAPI) {
        let users = [];

        usersAPI.getUsers()
            .then(users => {
                users = users.data;
            })
    })