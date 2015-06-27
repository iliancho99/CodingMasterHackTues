app.factory('forumService', ['$http', 'headersService', 'baseUrl', function($http, headersService, baseUrl) {

    return {
        getPostComments: getPostComments,
        getSinglePostData: getSinglePostData,
        getAllPosts: getAllPosts,
        addComment: addComment,
        addPost: addPost
    };

    function getAllPosts(){
        var headers = headersService.getHeaders();
        return $http({
            method: 'GET',
            headers: headers,
            url: baseUrl + 'classes/Post'
        });
    }

    function getPostComments(postId){
        var headers = headersService.getHeaders();
        return $http({
            method: 'GET',
            headers: headers,
            url: baseUrl + 'classes/Comment?where={ "post": { "__type": "Pointer","className": "Post","objectId": "' + postId + '" }}'
        });
    }

    function getSinglePostData(postId){
        var headers = headersService.getHeaders();
        return $http({
            method: 'GET',
            headers: headers,
            url: baseUrl + 'classes/Post/' + postId
        });
    }

    function addPost(post){
        var headers = headersService.getHeaders();
        return $http({
            method: 'POST',
            headers: headers,
            url: baseUrl + 'classes/Post',
            data: post
        });
    }

    function addComment(comment){
        var headers = headersService.getHeaders();
        return $http({
            method: 'POST',
            headers: headers,
            url: baseUrl + 'classes/Comment',
            data: comment
        });
    }
}]);