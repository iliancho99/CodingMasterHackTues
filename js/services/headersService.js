app.factory('headersService', [function() {
    return {
        getHeaders: getHeaders
    };

    function getHeaders(){
        return {
            'X-Parse-Application-Id': 'pPr0Jzk83BDeZURevE0RHlbRo1NIuSMDpQ6po6jK',
            'X-Parse-REST-API-Key': 'OYCHq0Shq8fcgsRVJnNa7eypVOm8OdszawDd0pjg'
        }
    }
}]);