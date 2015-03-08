define(['app'], function (app) {
    app.register.controller('productController', function($scope, $routeParams, ShoppingcartService, ProductService){
        ProductService.getProduct($routeParams.id).then(function(result){
            $scope.product = result.data;

            $scope.buy = function(product) {
                ShoppingcartService.buy(product).then(function(result){
                    $scope.shoppingcart = result.data;
                });
            };

        });

        ShoppingcartService.getShoppingcart().then(function(result) {
            $scope.shoppingcart = result.data;
        });
    });
});