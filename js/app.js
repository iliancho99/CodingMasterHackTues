var app = angular.module("app", ['ngRoute']);

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

app.constant('baseUrl', 'https://api.parse.com/1/');