app.factory('forumService', ['$http', 'headersService', 'baseUrl', function($http, headersService, baseUrl) {

    return {
        getPostComments: getPostComments,
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
            url: baseUrl + 'classes/Post?where={ "post": { "__type": "Pointer","className": "Post","objectId": "' + postId + '" }}'
        });
    }
}]);