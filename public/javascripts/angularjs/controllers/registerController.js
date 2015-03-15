define(['app'], function (app) {
    app.register.controller('registerController', function($scope, RegisterService, $location){
        $scope.user = {};

        $scope.signup = function() {
            RegisterService.signup($scope.user).then(function(data){
                $scope.user = {};
                sessionStorage['currentUser'] = data;
                $location.path("/");
            },
            function(error){
               $scope.signupError = "Error";
            });
        };
    });
});