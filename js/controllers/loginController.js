app.controller('loginController', ['$scope', 'userService','notifyService' , function ($scope, userService, notifyService) {
    $scope.inputLoginUser = {};

    $scope.login = function(user){
        if(user.password.length < 6){
            notifyService.showError("Password is too short. Please enter at least six characters.");
        } else {
            userService.loginUser(user)
                .success(function (data) {
                    sessionStorage['sessionToken'] = data.sessionToken;
                    sessionStorage['username'] = data.username;
                    window.location.reload();
                })
                .error(function (data) {
                    notifyService.showError("Error!!!");
                });
        }
    };
}]);