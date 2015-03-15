/**
 * Created by nstavrev on 2/22/15.
 */
require.config({
    baseUrl: '/javascripts/angularjs',
    urlArgs: 'v=1.3'
});

require(
    [   'ui.bootstrap',
        'app',
        'directives/autocomplete',
		'functions',
		'controllers/menuController',
        'services/routeResolver',
        'services/homeService',
        'services/shoppingcartService',
        'services/productService',
        'services/checkoutService',
        'services/registerService',
        'services/loginService'
    ],
    function () {
        angular.bootstrap(document, ['productMarket']);
    });
	
