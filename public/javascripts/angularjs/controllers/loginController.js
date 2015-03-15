define(['app'], function (app) {
    app.register.controller('loginController', function($scope, LoginService, $location){
        $scope.userData = {};

        $scope.login = function() {
          LoginService.login($scope.userData)
              .then(
              function(success){
                sessionStorage['currentUser'] = success.data;
                $location.path("/");
              },
              function(error){
                  $scope.loginError = error.data;
              }
          );
        };
    });
});