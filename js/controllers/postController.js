app.controller("postController", ['$scope', '$routeParams', 'forumService', 'notifyService',
    function ($scope, $routeParams, forumService, notifyService) {
        $scope.addComment = {};

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
                notifyService.showError("Error!!!");
            });

        $scope.commentAdd = function (postId, comment) {
            comment.post = {
                __type: "Pointer",
                    className: "Post",
                    objectId: postId
            };
            comment.author = sessionStorage['username'];
            forumService.addComment(comment)
                .success(function (data) {
                    notifyService.showMsg("Add post successfully");
                    $scope.post.comments.push(comment);
                    $scope.addComment = {};
                })
                .error(function () {
                    notifyService.showError("Error!!!");
                });
        }
}]);