define(['app'], function (app) {
	app.controller('ModalInstanceCtrl', function($scope, $modalInstance){
            $scope.cancel = function() {
            	$modalInstance.dismiss('cancel');
            };
		}
	)
});