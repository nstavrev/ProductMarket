/**
 * Created by nstavrev on 2/22/15.
 */
define(['app'], function (app) {

    app.factory('LoginService', function($http){

        return {
            login : function(userData) {
                return $http({
                    url : "/login",
                    method : "POST",
                    data : userData
                });
            },
            logout : function() {
              return $http({
                  url : "/logout",
                  method : "POST"
              });
            }
        }
    });
});
