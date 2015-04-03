define(['app'], function (app) {
    app.directive('productSlide', function() {
       return function(scope, element){
       			
   				var productDescription = $(element).find('.product-description')[0];
				var productDescriptionInvert = $(element).find('.product-description-invert')[0];
       			var speed = 150;
		       	element.mouseenter( function(){			
					$(productDescription).hide('slide',{direction:'right'},speed);
					$(productDescriptionInvert).show('slide',{direction:'right'},speed);
				})
				element.mouseleave(function(){
					$(productDescription).show('slide',{direction:'right'},speed);
					$(productDescriptionInvert).hide('slide',{direction:'right'},speed);

				})
       }
	})
});