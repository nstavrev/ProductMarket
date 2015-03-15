define(['app'], function (app) {
    app.directive('autoComplete', function() {
       return function(scope, element, attrs){
                   element.autocomplete({
                       source : "/autocomplete",
                       html : true
                   });

       }
    });
});