app.factory('forumService', ['$http', 'headersService', 'baseUrl', function($http, headersService, baseUrl) {

    return {
        getPostComments: getPostComments,
        getSinglePostData: getSinglePostData,
        getAllPosts: getAllPosts
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
}]);