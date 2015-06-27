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
        .otherwise({
            redirectTo: "/"
        })
});