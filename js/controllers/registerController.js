app.controller('registerController', ['$scope', 'userService','notifyService' , function ($scope, userService, notifyService) {
    $scope.register = function(user){
        if(user.password.length < 6){
            notifyService.showError("Password is too short. Please enter at least six characters.");
        } else if(user.password != user.confirmPassword){
            notifyService.showError("The two passwords do not match");
        } else {
            delete user.confirmPassword;
            userService.registerUser(user)
                .success(function (data) {
                    sessionStorage['sessionToken'] = data.sessionToken;
                    sessionStorage['username'] = user.username;
                    window.location.reload();
                })
                .error(function (data) {
                    notifyService.showError("Error!!!");
                });
        }
    };
}]);