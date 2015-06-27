app.controller("postController", ['$scope', '$routeParams', 'forumService', 'notifyService',
    function ($scope, $routeParams, forumService, notifyService) {
    var postId = $routeParams.postId;
    forumService.getSinglePostData(postId)
        .success(function (data) {
            $scope.post = data;

            forumService.getPostComments(postId)
                .success(function (comments) {
                    $scope.post.comments = comments.results;
                })
                .error(function () {
                    notifyService.showError("Error!!!");
                });
        })
        .error(function () {

        });
}]);