define(['app'], function (app) {
    app.directive('autoComplete', function() {
       return function(scope, element){
                   element.autocomplete({
                       source : "/autocomplete",
                       html : true,
                       messages: {
                           noResults: '',
                           results: function() {}
                       },
                       focus : function(item){

                       }
                   }).data('ui-autocomplete')._renderItem = function(ul, item){
                       return $( "<li class='page-row'></li>" )
                           .data( "item.autocomplete", item )
                           .append( $( "<a></a>" )[ this.options.html ? "html" : "text" ]( item.label ) )
                           .appendTo( ul );
                   };
                    $('body>span').remove();
                     $('body>ul').wrap("<div class='page-row'></div>");
                   
       }
    });
});