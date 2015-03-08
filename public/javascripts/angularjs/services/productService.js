/**
 * Created by nstavrev on 2/22/15.
 */
define(['app'], function (app) {

    app.factory('ProductService', function($http){

        return {
            getProduct : function(id) {
                return $http.get('/get/product/' + id);
            }
        }
    });
});
