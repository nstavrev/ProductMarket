define(['app'], function (app) {
    app.register.controller('homeController', function($scope,$routeParams, HomeService){
        $scope.homePage = $routeParams.name == undefined;
        $scope.parentCategory = $routeParams.name != undefined ? "/" + $routeParams.name : "";

        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: 'http://placekitten.com/' + newWidth + '/300',
                text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                    ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };


        $scope.loading = true;

        HomeService.getHomeProducts($routeParams.name, $routeParams.sub).then(function(result){
           $scope.loading = false;
           $scope.categories = result.data.categories;
           $scope.products = result.data.products;
           $scope.shoppingcart = result.data.shoppingcart;

           $scope.totalItems = $scope.products.length;
           $scope.currentPage = 1;
           $scope.productsPerPage = 30;

           $scope.$watch('currentPage + productsPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.productsPerPage),
                    end = begin + $scope.productsPerPage;
                $scope.filteredProducts = $scope.products.slice(begin, end);
           });
        });

        HomeService.getTopProducts().then(function(result){
           var slides = $scope.slides = result.data;

        });

        $scope.buy = function(product) {
            HomeService.buy(product).then(function(result){
               $scope.shoppingcart = result.data;
            });
        };
    });
});