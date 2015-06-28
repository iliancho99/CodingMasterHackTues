app.factory('storageService', ['$http', 'headersService', 'baseUrl', function($http, headersService, baseUrl) {

    return {
        setObjectToLocalStorage: setObjectToLocalStorage,
        getObjectToLocalStorage: getObjectToLocalStorage

    };

    function setObjectToLocalStorage(name, obj){
        localStorage[name] = JSON.stringify(obj)
    }
    function getObjectToLocalStorage(name){
        return JSON.parse(localStorage[name]);
    }
}]);