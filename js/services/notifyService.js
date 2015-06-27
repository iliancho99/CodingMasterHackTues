app.factory("notifyService", [function() {

    return {
        showMsg: showMsg,
        showError: showError
    };

    function showMsg(msg){
        noty({
            text: msg,
            type: 'success',
            layout: 'topCenter',
            timeout: 1000}
        );
    }

    function showError(error){
        noty({
            text: error,
            type: 'error',
            layout: 'topCenter',
            timeout: 2000}
        );
    }
}]);