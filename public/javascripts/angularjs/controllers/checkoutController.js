define(['app'], function (app) {
    app.register.controller('checkoutController', function($scope, CheckoutService){

        CheckoutService.isAnonymous().success(function(data){
           $scope.isAnonymous = data;
           if(data == false) {
               CheckoutService.save().success(function(data){
                  $scope.successMessage = data;
               });
           } else {
               $scope.editable = true;
               $scope.userData = {};
           }
        });

        $scope.checkout = function() {
          CheckoutService.saveAnonymous($scope.userData).success(function(data){
             $scope.successMessage = data;
             $scope.editable = false;
          });
        };
    });
});