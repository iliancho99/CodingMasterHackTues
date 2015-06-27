app.controller("testHTMLController", ['$scope', function ($scope) {
    $scope.changeHTML = function (htmlCode) {
        $(".viewHTML").html(htmlCode);
    }
}]);