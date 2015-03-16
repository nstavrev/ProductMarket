define(['app'], function (app) {
    app.register.controller('profileController', function($scope, ProfileService){
        $scope.loading = true;
        ProfileService.getProfile().then(function(result){
           $scope.loading = false;
           $scope.user = result.data;
        },
        function (error){
            $scope.loading = false;
            $scope.user = undefined;
        });
    });
});