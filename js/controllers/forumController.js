app.controller('forumController', ['$scope', 'forumService','notifyService' ,
    function ($scope, forumService, notifyService) {
    $scope.addPost = {};
    forumService.getAllPosts()
        .success(function (data) {
            $scope.posts = data.results;
        })
        .error(function (data) {
            notifyService.showError("Error!!!");
        });

    $scope.postAdd = function (post) {
        post.author = sessionStorage['username'];
        forumService.addPost(post)
            .success(function (data) {
                notifyService.showMsg("You add post successfully");
                $scope.posts.push(post);
            })
            .error(function () {
                notifyService.showError("Error!!!");
            });
    }
}]);