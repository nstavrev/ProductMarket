/**
 * Created by nstavrev on 2/22/15.
 */
define(['app'], function (app) {

    app.factory('RegisterService', function($http){

        return {
            signup : function(user) {
                return $http({
                    url : "/register",
                    method : "POST",
                    data : user
                });
            }
        }
    });
});
