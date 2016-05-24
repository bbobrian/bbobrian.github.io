'use strict';

(function () {
    'use strict';

    angular.module('app', ['ngMaterial']).component('app', {
        templateUrl: 'app/app.html',
        controller: appController
    });

    appController.$inject = [];
    function appController() {
        console.log('app loaded');
    }
})();
//# sourceMappingURL=script.js.map
