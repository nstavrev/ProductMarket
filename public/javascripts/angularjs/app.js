/**
 * Created by nstavrev on 2/22/15.
 */


'use strict';

define(['services/routeResolver'], function () {

    var app = angular.module('productMarket', ['routeResolverServices','ngRoute', 'ui.bootstrap']);

    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide','$locationProvider',
        function ($routeProvider, routeResolverProvider, $controllerProvider,
                  $compileProvider, $filterProvider, $provide) {

            //Change default views and controllers directory using the following:
            //routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');


            
            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;
            $routeProvider
                .when('/404', route.resolve('404'))
                .when('/', route.resolve('home'))
                .when('/category/:name', route.resolve('home'))
                .when('/category/:name/:sub', route.resolve('home'))
                .when('/product/:id', route.resolve('product'))
                .when('/shoppingcart', route.resolve('shoppingcart'))
                .otherwise({ redirectTo : "/404"});


        }]);

    return app;
});
/*
var productMarket = angular.module('productMarket', ['ngRoute']);



productMarket.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/', {
            templateUrl: '/home',
            resolve : resolveController('/javascripts/angularjs/homeController.js')
        }).when('/shoppingcart',{
            templateUrl : '/shoppingcart'
        }).when('/product', {
            templateUrl : '/product'
        }).when('/sign',{
            templateUrl : '/sign'
        })
}]);
*/