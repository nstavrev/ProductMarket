define(['app'], function (app) {
    app.directive('autoComplete', function() {
       return function(scope, element, attrs){
           scope.$watch('selected', function() {
                   element.autocomplete({
                       source : "/autocomplete",
                       html : true
                   });
           });
       }
    });
});