/**
 * Created by nstavrev on 2/22/15.
 */
define(['app'], function (app) {

    app.factory('ShoppingcartService', function($http){

        return {
            buy : function(productData){
                return $http({
                    url : "/buy",
                    method : "POST",
                    data : productData
                });
            },
            getShoppingcart : function() {
                return $http.get('/get/shoppingcart');
            },
            delete : function(id) {
                return $http({
                    url : "/deleteProduct",
                    method : "POST",
                    data : { id : id }
                });
            }
        }
    });
});
