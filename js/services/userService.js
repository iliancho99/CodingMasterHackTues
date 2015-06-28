app.factory('userService', ['$http', 'headersService', 'baseUrl', function($http, headersService, baseUrl) {

    return {
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser
    };

    function registerUser(user){
        var headers = headersService.getHeaders();
        return $http({
            method: 'POST',
            headers: headers,
            url: baseUrl + 'users',
            data: user
        });
    }

    function loginUser(user){
        var headers = headersService.getHeaders();
        var data = '?username=' + user.username + '&password=' + user.password;
        //headers['X-Parse-Revocable-Session'] = '1';
        return $http({
            method: 'GET',
            headers: headers,
            url: baseUrl + 'login/' + data,
            data: data
        });
    }

    function logoutUser(){
        var headers = headersService.getHeaders();
        return $http({
            method: 'POST',
            headers: headers,
            url: baseUrl + 'logout'
        });
    }
}]);