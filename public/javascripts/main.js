/**
 * Created by nstavrev on 2/22/15.
 */
require.config({
    baseUrl: '/javascripts/angularjs',
    urlArgs: 'v=1.2'
});

require(
    [   'ui.bootstrap',
        'app',
        'services/routeResolver',
        'services/homeService',
        'services/shoppingcartService',
        'services/productService'
    ],
    function () {
        angular.bootstrap(document, ['productMarket']);
    });
