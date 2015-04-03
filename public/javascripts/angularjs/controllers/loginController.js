define(['app'], function (app) {
    app.controller('loginController', function($scope, $modalInstance, LoginService){
        $scope.userData = {};

        $scope.login = function() {
          LoginService.login($scope.userData)
              .then(
              function(success){
                sessionStorage['currentUser'] = success.data;
                $scope.cancel();
              },
              function(error){
                  $scope.loginError = error.data;
              }
          );
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };

    });
});