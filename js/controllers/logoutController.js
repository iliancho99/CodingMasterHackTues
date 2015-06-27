app.controller('logoutController', ['$scope', 'userService','notifyService' , function ($scope, userService, notifyService) {

    userService.logoutUser()
        .success(function (data) {
            delete sessionStorage['sessionToken'];
            delete sessionStorage['username'];
            window.location.reload();
        })
        .error(function (data) {
            notifyService.showError("Error!!!");
        });

}]);