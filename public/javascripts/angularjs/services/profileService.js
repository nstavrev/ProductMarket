/**
 * Created by nstavrev on 2/22/15.
 */
define(['app'], function (app) {

    app.factory('ProfileService', function($http){

        return {
            getProfile : function() {
                return $http.get('/profile/details');
            }
        }
    });
});
