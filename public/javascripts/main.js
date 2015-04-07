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
        '../jQuery/functions',
        'directives/autocomplete',
        'directives/productsSlide',
        'controllers/modalInstanceController',
		'controllers/indexController',
        'controllers/loginController',
        'controllers/registerController',
        'services/routeResolver',
        'services/homeService',
        'services/shoppingcartService',
        'services/productService',
        'services/checkoutService',
        'services/registerService',
        'services/loginService',
        'services/profileService'
    ],
    function () {
        angular.bootstrap(document, ['productMarket']);
    });
	
