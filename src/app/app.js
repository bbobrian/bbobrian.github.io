(() => {
    'use strict';

    angular
        .module('app')
        .component('app', {
            templateUrl: 'app/app.html',
            controller: appController
        });

    appController.$inject = [];
    function appController() {
        console.log('app loaded');
    }
})();