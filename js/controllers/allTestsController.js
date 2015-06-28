app.controller('allTestController', ['$scope', 'testService','notifyService',
    function ($scope, testService, notifyService) {
        testService.getAllTests()
            .success(function (data) {
                $scope.tests = data.results;
            })
            .error(function () {
                notifyService.showError("Error!!!");
            });
    }]);