app.controller('forumController', ['$scope', 'forumService','notifyService' , function ($scope, forumService) {
    forumService.getAllPosts()
        .success(function (data) {
            $scope.posts = data.results;
        })
        .error(function (data) {
            notifyService.showError("Error!!!");
        });
}]);