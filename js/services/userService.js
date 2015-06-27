app.factory('userService', ['$http', 'headersService', 'baseUrl', function($http, headersService, baseUrl) {

    return {
        loginUser: loginUser,
        registerUser: registerUser
    };

    function registerUser(user){
        var headers = headersService.getHeaders();
        return $http({
            method: 'POST',
            headers: headers,
            url: baseUrl + 'register',
            data: user
        });
    }

    function loginUser(user){
        var headers = headersService.getHeaders();
        return $http({
            method: 'GET',
            headers: headers,
            url: baseUrl + 'login',
            data: user
        });
    }
}]);