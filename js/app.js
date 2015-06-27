var app = angular.module("app", ['ngRoute']);

if(sessionStorage['sessionToken']){
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "partials/home.html"
            })
            .when('/testHTML', {
                controller: "testHTMLController",
                templateUrl: "partials/testHTML.html"
            })
            .when('/forum', {
                controller: "forumController",
                templateUrl: "partials/forum.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    });
}else{
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "partials/welcome.html"
            })
            .when('/login', {
                controller: "registerController",
                templateUrl: "partials/login.html"
            })
            .when('/register', {
                controller: "loginController",
                templateUrl: "partials/register.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    });
}

app.constant('baseUrl', 'https://api.parse.com/1/');