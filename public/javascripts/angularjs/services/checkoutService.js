/**
 * Created by nstavrev on 2/22/15.
 */
define(['app'], function (app) {

    app.factory('CheckoutService', function($http){

        return {
            isAnonymous : function() {
                return $http.get('/isAnonymous');
            },
            save : function() {
                return $http({
                    url : "/checkout",
                    method : "POST"
                });
            },
            saveAnonymous : function(userData){
                return $http({
                   url : "/checkout",
                   method : "POST",
                   data : userData
                });
            }
        }
    });
});
