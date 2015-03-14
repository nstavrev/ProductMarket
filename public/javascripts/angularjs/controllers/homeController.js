define(['app'], function (app) {
    app.register.controller('homeController', function($scope,$routeParams, HomeService){
        $scope.homePage = $routeParams.name == undefined;
        $scope.parentCategory = $routeParams.name != undefined ? "/" + $routeParams.name : "";

        $scope.myInterval = 5000;
      
        $scope.loading = true;

        HomeService.getHomeProducts($routeParams.name, $routeParams.sub).then(function(result){
           $scope.loading = false;
           $scope.categories = result.data.categories;
           $scope.products = result.data.products;
           $scope.shoppingcart = result.data.shoppingcart;

           $scope.totalItems = $scope.products.length;
           $scope.currentPage = 1;
           $scope.productsPerPage = 12;

           $scope.$watch('currentPage + productsPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.productsPerPage),
                    end = begin + $scope.productsPerPage;
                $scope.filteredProducts = $scope.products.slice(begin, end);
           });
        });

        HomeService.getTopProducts().then(function(result){
           var slides = $scope.slides = result.data;

        });

        HomeService.getLastestProducts().then(function(result){
          console.log(result.data);
          var slides = $scope.productSlides = result.data;
        });

        $scope.buy = function(product) {
            HomeService.buy(product).then(function(result){
               $scope.shoppingcart = result.data;
            });
        };
		
		// size of the columns in second row on home page
		$scope.columnClass = '9';
		if($scope.homePage){
			$scope.columnClass = '12';
		}
		
		
		
		
    });
});