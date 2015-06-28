app.factory('testService', ['$http', 'headersService', 'baseUrl', function($http, headersService, baseUrl) {

    return {
        getAllTests: getAllTests,
        getTest: getTest,
        getQuestions: getQuestions
    };

    function getAllTests(){
        var headers = headersService.getHeaders();
        return $http({
            method: 'GET',
            headers: headers,
            url: baseUrl + 'classes/Test/'
        });
    }

    function getTest(testId){
        var headers = headersService.getHeaders();
        return $http({
            method: 'GET',
            headers: headers,
            url: baseUrl + 'classes/Test/' + testId
        });
    }

    function getQuestions(testId){
        var headers = headersService.getHeaders();
        return $http({
            method: 'GET',
            headers: headers,
            url: baseUrl + 'classes/Question?where={ "test": { "__type": "Pointer","className": "Test","objectId": "' + testId + '" }}'
        });
    }

}]);