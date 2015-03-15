define(['app'], function (app) {
	app.controller('menuController', function($scope, $routeParams, HomeService){
			$scope.menuClass = 'inactive';

			$scope.changeMenuClass = function(){
			  if ($scope.menuClass === "inactive")
				$scope.menuClass = "active";
			  else
				$scope.menuClass = "inactive";
			};
			$scope.hideNav = function(){
				$scope.menuClass = "inactive";
			}
			
			$scope.$on("$routeChangeSuccess", function () {
				$scope.menuClass = 'inactive';
			});



            //$scope.names = ['<div style="background: red">Alabala</div>', 'b', 'c', 'd', 'e', 'f'];
		}
	)
});