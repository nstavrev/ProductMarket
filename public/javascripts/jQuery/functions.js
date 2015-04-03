$(document).ready(function(){
	$('.newsletter').hide('slide',{direction:'right'},500);
	var productDescription = $('.home-products').find('.product-description')[0];
	$(productDescription).hide('slide',{direction:'right'},500);

	var isOpenMainNav = false;
	$('#menu-outer-wrapper').click(function(){
		//hideAnimatedNav()
	})
	$('#tiger-main-menu').click(function(){
		if(isOpenMainNav === false){
			$( '.menu-outer-wrapper' ).animate({
				left: "0"
			}, 400);
			isOpenMainNav = true;
		}
		else{
			hideAnimatedNav()
		}
	})
	
	function hideAnimatedNav() {
		$( '.menu-outer-wrapper' ).animate({
			left: "-320px"
		}, 400);
		isOpenMainNav = false;
	}
	
	$('.menu-category').click(function(){
		var isOpen = $(this).find('i').hasClass('fa-minus');
		if(!isOpen){
			$(this).next('.menu-subcategory').slideDown(300);
			$(this).find('i').removeClass('fa-plus')
							.addClass('fa-minus');
		}
		else{
			$(this).next('.menu-subcategory').slideUp(300);
			$(this).find('i').removeClass('fa-minus')
							.addClass('fa-plus');
		}
	})
	
	window.addEventListener("hashchange", hideAnimatedNav, false);
	
})
