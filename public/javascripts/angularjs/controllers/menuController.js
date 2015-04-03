define(['app'], function (app) {
	app.controller('menuController', function($scope, $routeParams, HomeService, LoginService, 
		$location,  $modal, $log, $timeout){
            $scope.sessionStorage = sessionStorage;

            $scope.locale = "bg";
            HomeService.getLabels().success(function(data){
               $scope.labels = data;
            });


			$scope.menuClass = 'inactive';

			$scope.changeMenuClass = function(){
			  if ($scope.menuClass === "inactive")
				$scope.menuClass = "active";
			  else
				$scope.menuClass = "inactive";
			};
			$scope.hideNav = function(){
				$scope.menuClass = "inactive";
			};
			
			$scope.$on("$routeChangeSuccess", function () {
				$scope.menuClass = 'inactive';
			});

            $scope.logout = function() {
                LoginService.logout().success(function(data){
                    delete sessionStorage['currentUser'];
                    $location.path('/');
                });
            };
            $scope.changeLang = function(lang) {
            	$scope.locale = lang;
            };
            //open login
			$scope.openLogin = function () {
					var modalInstance = $modal.open({
					templateUrl: 'login',
					controller: 'loginController',
					scope : $scope,
					windowClass : 'form-modal'
				});
			};

			// open register
			$scope.openRegister = function(){
				var modalInstance = $modal.open({
					templateUrl: 'register',
					controller: 'registerController',
					scope : $scope,
					windowClass : 'form-modal'
				})
			}

		}
	)
});