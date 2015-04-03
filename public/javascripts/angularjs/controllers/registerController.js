define(['app'], function (app) {
    app.controller('registerController', function($scope, $modalInstance, RegisterService){
        $scope.user = {};

        $scope.signup = function() {
            RegisterService.signup($scope.user).then(function(data){
                $scope.user = {};
                sessionStorage['currentUser'] = data;
                $scope.cancel();
            },
            function(error){
               $scope.signupError = "Error";
            });
        };
        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        }
    });
});