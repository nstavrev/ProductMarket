define(['app'], function (app) {
    app.register.controller('shoppingcartController', function($scope, ShoppingcartService){

        ShoppingcartService.getShoppingcart().then(function(result){
            $scope.shoppingcart = result.data;
            if($scope.shoppingcart.items) {
                $scope.calculateGrandTotal = function(product) {

                    var grandTotal = 0;
                    Object.keys($scope.shoppingcart.items).forEach(function(key, index){
                        console.log($scope.shoppingcart.items[key])
                        grandTotal += Number(parseFloat(parseFloat($scope.shoppingcart.items[key].price) * parseFloat($scope.shoppingcart.items[key].qty) ).toFixed(2));
                    });
                    console.log(grandTotal);
                    $scope.grandTotal = parseFloat(grandTotal).toFixed(2);
                    return grandTotal;
                };
                $scope.removeProduct = function(id){
                    ShoppingcartService.delete(id).then(function(result){
                        $scope.shoppingcart = result.data;
                        if($scope.shoppingcart) {
                            $scope.calculateGrandTotal();
                        }
                    });
                };
                $scope.calculateGrandTotal();
            }

            $scope.showRefreshButton = function() {
                $scope.refreshButton = true;
            }

            $scope.refresh = function() {
              ShoppingcartService.update($scope.shoppingcart).success(function(data){
                $scope.refreshButton = false;
              });
            };

        });

    });
});