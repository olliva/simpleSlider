$(function(){
	$.fn.mySlider = function (slideWidth, slideNumber){
					var list = $(this);
					list.addClass('slidesContainer clearfix');
					list.children().addClass('slide');
					list.children().first().addClass('activeSlide');
					list.wrap('<div class="mainSliderCont" />').wrap('<div class="sliderContainer" />');
					var $root = list.parent().parent();
					$root.append('<div class="controls" />');
					$root.find('.controls').prepend('<div class="nextSlide control" />');
					$root.find('.controls').prepend('<div class="prevSlide control" />');
				

				
					$root.find('.slidesContainer').find('.slide').each(function(index, element){
						$(element).css('left', slideWidth*index + 'px');
					})
					function defindActiveElement(){
						var activeElementIndex = 1;
						$root.find('.slidesContainer').find('.slide').each(function(index, element){
							if ($(element).hasClass("activeSlide")){
								activeElementIndex = index;
							}
						})
						return activeElementIndex;
					}
					function animateLeft(value){
						$root.find('.slidesContainer').find('.slide').each(function(index, element){
							var slideLeft = +$(element).css('left').replace("px", "");
							$(element).animate({'left': slideLeft + value + 'px'}, 1000);
						})
					}

					$root.find(".nextSlide").on('click', function(){
						if( $root.find('.slidesContainer').find('.slide').is(':animated') ){
							return;
						}
						else{
							var activeElementIndex = defindActiveElement();

								//перестановка класса активного слайда по кругу
							if(activeElementIndex == (slideNumber - 1)){
								$root.find('.slidesContainer .slide').first().css('left', slideWidth + 'px');
								$root.find('.slidesContainer .slide').filter('.activeSlide').removeClass('activeSlide');
								$root.find('.slidesContainer .slide').first().addClass('activeSlide');
							}
							else{
								$root.find('.slidesContainer .slide').eq(activeElementIndex+1).css('left', slideWidth + 'px');
								$root.find('.slidesContainer .slide').filter('.activeSlide').removeClass('activeSlide').next().addClass('activeSlide');
							}
							animateLeft(-slideWidth);
						}
					});
					$root.find(".prevSlide").on('click', function(){
						if( $root.find('.slidesContainer').find('.slide').is(':animated') ){
							return;
						}
						else{
							var activeElementIndex = defindActiveElement();
							if(activeElementIndex == (0)){
								$root.find('.slidesContainer .slide').last().css('left', -slideWidth + 'px');
								$root.find('.slidesContainer .slide').filter('.activeSlide').removeClass('activeSlide');
								$root.find('.slidesContainer .slide').last().addClass('activeSlide');
							}
							else{
								$root.find('.slidesContainer .slide').eq(activeElementIndex-1).css('left', - slideWidth + 'px');
								$root.find('.slidesContainer .slide').filter('.activeSlide').removeClass('activeSlide').prev().addClass('activeSlide');
							}
							animateLeft(+slideWidth);
						}
					});
				}
			});