/**
 * Created by nstavrev on 2/22/15.
 */
define(['app'], function (app) {

    app.factory('HomeService', function($http, ShoppingcartService){

        return {
            getHomeProducts : function(category, subCategory, page) {
                var url = '/home/products';
                if(category) {
                    url += '?category=' + category;
                }
                if(category && subCategory) {
                    url += "&subCategory=" + subCategory
                }
                if(category && page) {
                    url += "&page=" + page;
                } else if(page) {
                    url += "?page=" + page;
                }
                return $http.get(url);
            },
            getTopProducts : function() {
              return $http.get('/top');
            },
            getLastestProducts : function(){
                return $http.get('/latestProducts');
            },
            buy : function(productData) {
                return ShoppingcartService.buy(productData);
            }
        }
    });
});
