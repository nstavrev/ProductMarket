define(['app'], function (app) {
    app.register.controller('profileController', function($scope, ProfileService){
        ProfileService.getProfile().then(function(result){
           $scope.user = result.data;
        },
        function (error){
            $scope.user = undefined;
        });
    });
});