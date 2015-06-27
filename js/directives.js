app.directive("siteHeader", function () {
    return {
        restrict: "EA",
        templateUrl: 'partials/siteHeader.html',
        replace: true
    }
});

app.directive("siteFooter", function () {
    return {
        restrict: "EA",
        templateUrl: 'partials/siteFooter.html',
        replace: true
    }
});



